import React from 'react'

function BalanceGraphic({vlBasics}) {


    const nowTime = Date.now() / 100;

    const twoWeeks = 24*60*60*14;

    const lastPeriod = vlBasics.nextPeriod - twoWeeks
    const finalPeriod = vlBasics.nextPeriod + twoWeeks
    
  return (
    <div className='flex flex-row grow border-red-600 border-2 border-solid' >
        {'sdas'}
    </div>

  )
}

export default BalanceGraphic