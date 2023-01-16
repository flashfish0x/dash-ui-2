import {vlYcrvInterface} from './interfaces/interfaces';
import { vlYcrvAddress } from './addresses/addresses';

import {
	Multicall
} from 'ethereum-multicall';

const {ethers} = require('ethers');

let all = [];

async function VlGeneralDetails(defaultProvider){
    console.log(defaultProvider);
    console.log(vlYcrvAddress);
	const multicall = new Multicall({ethersProvider: defaultProvider, tryAggregate: true});
	const contractCallContext = [
		{
			reference: 'vlYcrvContract',
			contractAddress: vlYcrvAddress(),
			abi: vlYcrvInterface,
			calls: [
				{reference: 'nextPeriod', methodName: 'nextPeriod', methodParameters: []},
				
			]
		}
	];

	const results = await multicall.call(contractCallContext);
	let resultsArray = results.results.vlYcrvContract.callsReturnContext;
	let vlGen = {};
    let res;
	// let currentTime = Date.now()/1000;
	for(let i=0; i < resultsArray.length; i++){
		res = resultsArray[i].returnValues[0];
		if(i == 0){
			vlGen.nextPeriod = ethers.BigNumber.from(res).toNumber();
		}
		
	}
	return vlGen;
}   

export {
    VlGeneralDetails
}