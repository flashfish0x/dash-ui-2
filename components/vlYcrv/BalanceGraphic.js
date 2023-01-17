import React, { useEffect, useRef } from 'react';
import {ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/24/outline'
import { toTimeStamp } from '@/utils/timeOpps';

function BalanceGraphic({vlBasics, user}) {


    const nowTime = Date.now() / 1000;

    const twoWeeks = 24*60*60*14;

    const lastPeriod = vlBasics.nextPeriod - twoWeeks
    const finalPeriod = vlBasics.nextPeriod + twoWeeks
    // console.log(nowTime)
    // console.log(lastPeriod)

    const elapsed = 100* (nowTime - lastPeriod)/(2*twoWeeks)
    let lastVoteElapsed
    if(user){
        
        lastVoteElapsed = 100*(nowTime - user.lastVoteTime)/(2*twoWeeks)
    }
    // let lastVoteElapsed = useRef("");
    console.log(lastVoteElapsed)
    // useEffect(() => {
       

    // }), [user];
    

    
    // const elapsed = 1
    // console.log(elapsed)
    
  return (
    <div className='flex flex-col py-4 grow mr-6'>
        <div className='relative ml-20 text-xs text-center m:ml-24 h-20'> 
            <div className='relative'>
                {user.lastVoteTime > lastPeriod && <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`${lastVoteElapsed}%`}}>
                    <div className='m-auto w-14'>{'Your Last Vote'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>}

                {/* Now */ }
                <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`${elapsed}%`}}>
                    <div className='mt-10 m-auto w-14'>{'Now'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-orange-500 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-orange-500'></ArrowDownIcon>
                    
                </div>

                <div className='absolute flex -ml-10 flex-col h-20 z-10' style={{left:`46.5%`}}>
                    <div className=' m-auto w-20'>{'vl-yCRV Vote Deadline'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>

                {user.lastVoteTime > lastPeriod - twoWeeks && <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`${user.lastVoteTime > lastPeriod ? 100 : 50}%`}}>
                    <div className='m-auto w-14'>{'When you can withdraw'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>}
                    
                </div>

                
            
        </div>
        
        <div className='flex  flex-row'>
            
            <div className='flex-none w-20 relative m:w-24 text-xs text-center m-auto'>{'vl-yCRV Periods (2Wks)'}</div>
            <div className='grid grid-cols-2 relative text-sm grow border-black border-2 text-black bg-blue-100 border-solid h-20' >
                <div className='flex h-full w-full ' ><div className='m-auto'>{'Current Period'}</div></div>
                <div className='flex h-full  w-full border-black border-l-2' ><div className='m-auto'>{'Next Period'}</div></div>
                <div className='absolute flex -ml-7 flex-col border-l-2 border-dotted bg-blue-400 opacity-50  h-20 text-xs text-center pt-2' style={{right:'50%', width:'3.5%'}}>
                    <div className='rotate-90 pt-12 w-20'>
                    {'yCRV Votes'}</div>

                </div>
                
                
                
            </div>
        </div>
        <div className='flex flex-row'>
            <div className='flex-none w-20 m:w-24 text-xs text-center m-auto'>{'Curve Vote Weeks'}</div>
            <div className='grid grid-cols-4 text-sm grow h-20 border-black border-x-2 border-b-2 bg-yellow-100 text-black' >
                
                <div className='flex h-full w-full ' ><div className='m-auto'>{'Week 1'}</div></div>
                <div className='flex h-full w-full border-black border-l-2' ><div className='m-auto'>{'Week 2'}</div></div>
                <div className='flex h-full w-full border-black border-l-2' ><div className='m-auto'>{'Week 3'}</div></div>
                <div className='flex h-full w-full border-black border-l-2' ><div className='m-auto'>{'Week 4'}</div></div>
            </div>
        </div>
        <div className='relative ml-20 text-xs text-center m:ml-24 h-20'> 
            <div className='relative'>
            <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`0%`}}>
                        
                        <div className='flex grow  hover:bg-red-400  w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(lastPeriod)}</div>
                        
                    </div>

                    {user.lastVoteTime > lastPeriod && <div className='absolute flex -ml-7 flex-col h-10 z-10' style={{left:`${lastVoteElapsed}%`}}>
                        
                        <div className='flex grow  hover:bg-red-400  w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(user.lastVoteTime)}</div>
                        
                    </div>}
                    
                    {/* Now */}
                    <div className='absolute flex -ml-7 flex-col h-10 z-10' style={{left:`${elapsed}%`}}>
                        
                        <div className='flex grow  hover:bg-red-400  w-0.5  bg-orange-500 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(nowTime)}</div>
                        
                    </div>

                    <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`46.5%`}}>
                        
                        <div className='flex grow  hover:bg-red-400  w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(vlBasics.nextPeriod)}</div>
                        
                    </div>

                    {user.lastVoteTime > lastPeriod- twoWeeks && <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`${user.lastVoteTime > lastPeriod ? 100 : 50}%`}}>
                        
                        <div className='flex grow  hover:bg-red-400  w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(finalPeriod)}</div>
                        
                    </div>}
                    
                </div>

                
            
        </div>
        {/* <div className='flex flex-row grow'  >
            <div>{lastPeriod}</div>
            <div className=''>{finalPeriod}</div>

        </div> */}
    </div>

  )
}

export default BalanceGraphic