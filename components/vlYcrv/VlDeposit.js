import React, {useEffect, useState} from 'react'
import BalanceGraphic from './BalanceGraphic';
import { VlGeneralDetails } from '@/ethereum/vlRead';
import useRPCProvider from '@/context/useRpcProvider';
import CurvePools from './CurvePools';
import { toTimeStamp } from '@/utils/timeOpps';

function VlDeposit({curveGauges}) {

	const {defaultProvider} = useRPCProvider();
	let [generalVl, setGeneralVl] = useState([]);
	const vl_position = 10;

	const nowTime = Date.now() / 1000;
	const oneWeeks = 24*60*60*7;
	const endPeriod = oneWeeks * Math.floor(nowTime / oneWeeks) + oneWeeks
	const startPeriod = endPeriod - 2*oneWeeks
	const endTime = oneWeeks * Math.floor(nowTime / oneWeeks) + oneWeeks*3
	console.log(toTimeStamp(endTime))
	console.log(toTimeStamp(nowTime))

	

	const test_users = [{
		balance: 100_000,
		votesSpent: 10_000,
		lastVoteTime: nowTime - oneWeeks,
		unlockTime: endTime,
		name: 'user1'
	}, {
		balance: 200_000,
		votesSpent: 200_000,
		lastVoteTime: nowTime - oneWeeks*4,
		unlockTime: endTime,
		name: 'user2'
	},{
		balance: 1_000_000,
		votesSpent: 0,
		lastVoteTime: nowTime - oneWeeks/8,
		unlockTime: endTime,
		name: 'user3'
	},{
		balance: 0,
		votesSpent: 0,
		lastVoteTime: 0,
		unlockTime: endTime,
		name: 'user4'
	},]

	let [test, setTest] = useState(test_users[0])
	
	useEffect(() => {

		try{
			
			VlGeneralDetails( defaultProvider).then(v => { 
				setGeneralVl(v);
				console.log(v);
			});
                
			
		}catch{console.log('eth failed');}


		
	}, [defaultProvider]);


	return (
		<div className='my-4'>
			<div className='border-dashed m-2 p-2 text-black rounded-sm bg-red-200 '>
			<div>{'Testing'}</div>
			{test && <div>
				{`currently testing: ${test.name}, balance: ${test.balance}, votesSpent: ${toTimeStamp(test.votesSpent)}, lastVoteTime: ${toTimeStamp( test.lastVoteTime)}, unlockTime: ${toTimeStamp(test.unlockTime)},`}
			</div>}
			<div className='grid grid-cols-4 text-black'>
				<div className=''>
				<button className='m-auto rounded-sm p-2 bg-slate-100' onClick={() => setTest(test_users[0])}>{'test one'}</button></div>
				<div className=''>
				<button className='bg-slate-100 p-2 rounded-sm' onClick={() => setTest(test_users[1])}>{'test two'}</button></div>
				<div>
				<button className='bg-slate-100 p-2 rounded-sm' onClick={() => setTest(test_users[2])} >{'test three'}</button></div>
				<div>
				<button className='bg-slate-100 p-2 rounded-sm' onClick={() => setTest(test_users[3])}>{'test test'}</button></div>
			</div>
			</div>

			{/*deposit box*/}
			<div className='flex m-4 flex-row'>
					<div className='flex-auto'>{'Vl-yCRV'}</div>
					<div className='flex-auto'>
				 		{'Votes Remaining This Period: ' + (test.balance - (test.lastVoteTime > startPeriod ? test.votesSpent : 0))}

				 

					</div>
				</div>
			<div className='flex flex-col bg-slate-700 rounded-md p-5'> 
				

				{generalVl && <BalanceGraphic vlBasics={generalVl} user={test}/>}


				 
				
			</div>
			{test && <CurvePools curveGauges={curveGauges} user={test}/>}
		</div>
	)
}

export default VlDeposit