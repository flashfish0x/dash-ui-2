

const {ethers} = require('ethers');

let all = [];

async function EventSearch(contract, defaultProvider, filterName){

    // console.log(filterName)
    contract = contract.connect(defaultProvider)
   

    // const x = new ethers.providers.Filter()
    
    

    let filter = contract.filters[filterName]();
    filter.fromBlock = 13435386
    // console.log(filter)

    let answer = await defaultProvider.getLogs(filter)
    console.log(contract.interface.events[filterName])
    console.log(contract.interface)
    // console.log(filter.topics)
    // console.log(answer)
    let decoded = []
    for(const top of answer){
        // console.log(top)
        //const a2 = {decoded: contract.interface.parseLog(top),

        const dec = contract.interface.decodeEventLog(contract.interface.events[filterName], top.data, filter.topics)
       
        let a2 = {
            transactionHash: top.transactionHash,
            blockNumber: top.blockNumber,
            results: []
        }

        for (var i = 0; i < dec.length; i++) {
            console.log(dec[i])
            a2.results.push(contract.interface.events[filterName].inputs[i].name + ": " + dec[i] )
        }   
        
        // console.log(a2)
        decoded.push(a2)
    }

    

    console.log(contract.interface)
    
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
    EventSearch
}