import React from 'react';
import {ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/24/outline'
import { toTimeStamp } from '@/utils/timeOpps';

function BalanceGraphic({vlBasics}) {


    const nowTime = Date.now() / 1000;

    const twoWeeks = 24*60*60*14;

    const lastPeriod = vlBasics.nextPeriod - twoWeeks
    const finalPeriod = vlBasics.nextPeriod + twoWeeks
    console.log(nowTime)
    console.log(lastPeriod)

    const elapsed = 100* (nowTime - lastPeriod)/(2*twoWeeks)
    // const elapsed = 1
    console.log(elapsed)
    
  return (
    <div className='flex flex-col py-4 grow mr-4'>
        <div className='relative ml-20 text-xs text-center m:ml-24 h-20'> 
            <div className='relative'>
            <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`10%`}}>
                    <div className='m-auto w-14'>{'Your Last Vote'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>
                <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`${elapsed}%`}}>
                    <div className='m-auto w-14'>{'Now'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>

                <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`50%`}}>
                    <div className='m-auto w-14'>{'Next Period'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>

                <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`100%`}}>
                    <div className='m-auto w-14'>{'When you can withdraw'}
                    </div>
                    <div className='flex grow  hover:bg-red-400 -mb-1 w-0.5  bg-green-700 m-auto'></div>
                    <ArrowDownIcon className='w-8 h-8 m-auto text-green-700'></ArrowDownIcon>
                    
                </div>
                    
                </div>

                
            
        </div>
        
        <div className='flex  flex-row'>
            
            <div className='flex-none w-20 m:w-24 text-xs text-center m-auto'>{'vl-yCRV Periods (2Wks)'}</div>
            <div className='grid grid-cols-2 relative text-sm grow border-black border-2 text-black bg-blue-100 border-solid h-20' >
                <div className='flex h-full w-full border-black border-r-2' ><div className='m-auto'>{'Current Period'}</div></div>
                <div className='flex h-full w-full' ><div className='m-auto'>{'Next Period'}</div></div>
                
                
                
            </div>
        </div>
        <div className='flex flex-row'>
            <div className='flex-none w-20 m:w-24 text-xs text-center m-auto'>{'Curve Vote Weeks'}</div>
            <div className='grid grid-cols-4 text-sm grow h-20 border-black border-x-2 border-b-2 bg-yellow-100 text-black' >
                
                <div className='flex h-full w-full border-black border-r-2' ><div className='m-auto'>{'Week 1'}</div></div>
                <div className='flex h-full w-full border-black border-r-2' ><div className='m-auto'>{'Week 2'}</div></div>
                <div className='flex h-full w-full border-black border-r-2' ><div className='m-auto'>{'Week 3'}</div></div>
                <div className='flex h-full w-full' ><div className='m-auto'>{'Week 4'}</div></div>
            </div>
        </div>
        <div className='relative ml-20 text-xs text-center m:ml-24 h-20'> 
            <div className='relative'>
            <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`0%`}}>
                        <ArrowUpIcon className='w-8 h-8 m-auto text-green-700'></ArrowUpIcon>
                        
                        <div className='flex grow  hover:bg-red-400 -mt-1 w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(lastPeriod)}</div>
                        
                    </div>

                    <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`10%`}}>
                        <ArrowUpIcon className='w-8 h-8 m-auto text-green-700'></ArrowUpIcon>
                        
                        <div className='flex grow  hover:bg-red-400 -mt-1 w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{'lv'}</div>
                        
                    </div>
                    

                    <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`${elapsed}%`}}>
                        <ArrowUpIcon className='w-8 h-8 m-auto text-green-700'></ArrowUpIcon>
                        
                        <div className='flex grow  hover:bg-red-400 -mt-1 w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(nowTime)}</div>
                        
                    </div>

                    <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`50%`}}>
                        <ArrowUpIcon className='w-8 h-8 m-auto text-green-700'></ArrowUpIcon>
                        
                        <div className='flex grow  hover:bg-red-400 -mt-1 w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(vlBasics.nextPeriod)}</div>
                        
                    </div>

                    <div className='absolute flex -ml-7 flex-col h-20 z-10' style={{left:`100%`}}>
                        <ArrowUpIcon className='w-8 h-8 m-auto text-green-700'></ArrowUpIcon>
                        
                        <div className='flex grow  hover:bg-red-400 -mt-1 w-0.5  bg-green-700 m-auto'></div>
                        
                        <div className='m-auto w-14'>{toTimeStamp(finalPeriod)}</div>
                        
                    </div>
                    
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