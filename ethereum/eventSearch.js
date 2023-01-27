

const {ethers} = require('ethers');

/*
    speed up ideas 
    batch https://geth.ethereum.org/docs/interacting-with-geth/rpc/batch

*/

async function StorageStuff(defaultProvider, hash){
    console.log('asd')

    let handled = {}
    //let s = await defaultProvider.send("debug_traceBlockByNumber", [16435333, "{}"])
    let s = await defaultProvider.send("debug_storageRangeAt", 
        ['0x48a7d14c3de82653491009c88c1392b47426e57050c15f4754b2ef54c78041e5',
        0, 
        hash, 
        '0x0000000000000000000000000000000000000000', 
        10000])
    
    s = Object.values(s.storage).sort((a,b) => a.key.localeCompare(b.key))

    for(let slot of s ){
        // console.log(slot)
        slot.hashedKey = ethers.utils.keccak256(slot.key)
    }

    for(let slot of s ){
        if(s.find(element => slot.hashedKey == element.key )){
            slot.type = 'Array'
        }
    }

    let comb = s.map(x => x.value.substring(2)).join('')
    console.log(comb)
    let zeros = (comb.match(/0/g) || []).length
    let total = comb.length

    console.log(100* zeros/total + "% of the storage slots in this contract are zeros")



    console.log(s)
    
    return s
}

async function EventSearch(contract, defaultProvider, filterName, f, t){

    
    /*filter = {
    address: tokenAddress,
    topics: [
        utils.id("Transfer(address,address,uint256)"),
        null,
        hexZeroPad(myAddress, 32)
    ]
};/*/
    // console.log(filterName)
    
   

    // const x = new ethers.providers.Filter()
    
    

    let filter = contract.filters[filterName]();
    filter.fromBlock = f
    filter.toBlock = t-1
    // console.log(filter)

    let answer = await defaultProvider.getLogs(filter)
    // console.log(contract.interface.events[filterName])
    // console.log(contract.interface)
    // console.log(filter.topics)
    console.log(answer)
    let decoded = []
    for(const top of answer){
        // console.log(top)
        //const a2 = {decoded: contract.interface.parseLog(top),

        
        // const dec = contract.interface.decodeEventLog(contract.interface.events[filterName], top.data, filter.topics)
        const dec = contract.interface.parseLog(top)
        // console.log(dec)
       
        let a2 = {
            eventName: filterName,
            transactionHash: top.transactionHash,
            blockNumber: top.blockNumber,
            results: []
        }

        for (var i = 0; i < dec.args.length; i++) {
            // console.log(dec.args[i])
            a2.results.push([dec.eventFragment.inputs[i].name, dec.args[i] ])
        }   
        
        // console.log(a2)
        decoded.push(a2)
    }

    

    // console.log(contract.interface)
    
    return decoded
	// 	//console.log(func);
	// 	// console.log(block.function);
	// 	let pass = true;
	// 	let inputs = block.function.inputs.map(x =>{
	// 		// console.log(x);
	// 		// console.log(block.inputs);
	// 		if(block.inputs[x.name]){
	// 			let ins = block.inputs[x.name];
	// 			// console.log('pass', x.name);
				
	// 			return ins; 
	// 		}
	// 		console.log('FAIL');
	// 		pass = false;
	// 	});
    // defaultProvider.get

    // console.log(defaultProvider);
    // console.log(vlYcrvAddress);
	// const multicall = new Multicall({ethersProvider: defaultProvider, tryAggregate: true});
	// const contractCallContext = [
	// 	{
	// 		reference: 'vlYcrvContract',
	// 		contractAddress: vlYcrvAddress(),
	// 		abi: vlYcrvInterface,
	// 		calls: [
	// 			{reference: 'nextPeriod', methodName: 'nextPeriod', methodParameters: []},
				
	// 		]
	// 	}
	// ];

	// const results = await multicall.call(contractCallContext);
	// let resultsArray = results.results.vlYcrvContract.callsReturnContext;
	// let vlGen = {};
    // let res;
	// // let currentTime = Date.now()/1000;
	// for(let i=0; i < resultsArray.length; i++){
	// 	res = resultsArray[i].returnValues[0];
	// 	if(i == 0){
	// 		vlGen.nextPeriod = ethers.BigNumber.from(res).toNumber();
	// 	}
		
	// }
	// return vlGen;
}   

export {
    EventSearch,
    StorageStuff
}