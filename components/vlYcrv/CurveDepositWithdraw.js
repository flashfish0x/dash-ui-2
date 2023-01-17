import React from 'react'

function CurveDepositWithdraw({user}) {

    const nowTime = Date.now() / 1000;
	const oneWeeks = 24*60*60*7;
	const endPeriod = oneWeeks * Math.floor(nowTime / oneWeeks) + oneWeeks
	const startPeriod = endPeriod - 2*oneWeeks
	const endTime = oneWeeks * Math.floor(nowTime / oneWeeks) + oneWeeks*3
  return (
    <div className='m-4 p-4'><h1 className='text-lg'>{`You ${user.lastVoteTime < startPeriod - 2*oneWeeks ? 'Can' : 'Cant'} withdraw`}</h1> </div>
  )
}

export default CurveDepositWithdraw