import React, { useState } from 'react'

function CurveDepositWithdraw({user}) {
    const [deposit, setDeposit] = useState(true)

    const nowTime = Date.now() / 1000;
	const oneWeeks = 24*60*60*7;
	const endPeriod = oneWeeks * Math.floor(nowTime / oneWeeks) + oneWeeks
	const startPeriod = endPeriod - 2*oneWeeks
	const endTime = oneWeeks * Math.floor(nowTime / oneWeeks) + oneWeeks*3
  return (
    <div className='mt-4 bg-slate-700 rounded-md py-5'>
				<h2 className='text-2xl px-5 my-2'>{'Get your votes on'}</h2> 
				<div className='px-5'>{'Deposit vanilla yCRV for vote locked yCRV (vI-yCRV) and gain vote power for Curve voting. Each vote period lasts for two weeks, and your tokens cannot be withdrawn until the end of the following period. Please note, v-yCRV does not generate yield but maintains a 1:1 exchange rate with yCRV (so if yCRV increases in value, so will your vI-yCRV)'}</div>
	<div className='grid grid-cols-2  mt-4 w-full'>
        <button className='border-2 p-4' onClick={() => setDeposit(true)}>
            {'deposit'}
        </button>
        <button className='border-2 p-4' onClick={() => setDeposit(false)}>
            {'withdraw'}
        </button>

    </div>
    {deposit && <div className='w-full h-20 border-2' >{'dep now'}</div>}
    {!deposit && <div className='w-full h-20 border-2 p-4'>
     {user.lastVoteTime > startPeriod - 2*oneWeeks && <h1 className='text-lg text-red-600'>{`You can't withdraw`}</h1>}
    </div>}
    <div className='m-4 p-4'><h1 className='text-lg'>{`You ${user.lastVoteTime < startPeriod - 2*oneWeeks ? 'Can' : 'Cant'} withdraw`}</h1> </div>

    </div>
  )
}

export default CurveDepositWithdraw