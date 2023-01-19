import useRpcProvider from '@/context/useRpcProvider';
import { EventSearch, StorageStuff } from '@/ethereum/eventSearch';
import { JsonRpcBatchProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {ArrowPathIcon} from '@heroicons/react/24/outline'
import { nearestBlocks } from '@/utils/timeOpps';
import StorageSearch from './StorageSearch';

function SearchTx({hash}) {

    const [abi, setAbi] = useState({})

    const [event, setEvents] = useState([])

    const [errs, setErrors] = useState("")
    const [from, setFrom] = useState(new Date("1/1/22"))
    const [to, setTo] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const {defaultProvider} = useRpcProvider()

    
    

    useEffect(() => {
        if(hash){
            fetch("/api/abi", {method: 'POST', body: JSON.stringify(hash)})
            .then(response => {
               
                if (response.ok) {
                    return response.json();
                  }
                  throw new Error('Cant find abi');
                
            }).then(r => {
                // 
                console.log(r)
                
                const abb = new ethers.Contract(hash, r.message)
                // console.log(abb)
                setAbi(abb)
                setErrors("")
            }).catch((error) => {
                setErrors(error)
                console.log('error:', error)
            });
            
        }

        
        }, [hash]);
    

    
    function searchEvents(eventName){
        setLoading(true)

        nearestBlocks(Math.floor(from.getTime() / 1000), Math.floor(to.getTime() / 1000)).then((f) => EventSearch(abi, defaultProvider, eventName, f[0], f[1])).then((answer) => {
                setLoading(false)
                setEvents(answer)
                console.log(answer)
                console.log('eventsearchdone')
            })


       

        
        // console.log(eventName)
    }
    if(abi){
        console.log(abi)
    }

    console.log(from.toDateString())

  return (
    <div className='mt-3'>
        <h1>{`Searching ${hash}`}</h1>       
        
        
        {/* <div className="flex items-center justify-center">
            <div className="datepicker relative form-floating mb-3 xl:w-96">
                <input type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a date" />
                <label  className="text-gray-700">Select a date</label>
            </div>
        </div> */}

        {errs && <div className='grow p-10 text-center text-4xl text-red-600'> {String(errs)} </div>}
        {(loading || !abi.filters) &&
            <div className="flex justify-center items-center">
            <ArrowPathIcon className="mt-10 spinner-border animate-spin inline-block w-12 h-12" role="status">
             
            </ArrowPathIcon>
          </div>
        }
        {abi.filters  && !loading && 
            
            
            
            <div className='p-4'>
                <StorageSearch hash={hash} />
                
                <h1 className='flex p-2 text-4xl'> {'Events'}</h1>
                <div className='m-4 flex'> 
            <div className='mx-2'>{'from:'}</div><input className='text-black' onChange={(e) => { 
                console.log('whie', e); 
                setFrom(new Date(e.target.value))}} type="date" value={from.toISOString().split('T')[0]} />
            <div className='mx-2'>{'to:'}</div><input className='text-black' onChange={(e) => setTo(new Date(e.target.value))} type="date" value={to.toISOString().split('T')[0]} />
        </div>
                 
                
                <div className=''>
                <div className='p-4 flex-col'>
            {Object.keys(abi.filters).filter(y=>y.includes('(')).map(x => <button className='p-2 m-2 shadow-md rounded-md bg-slate-400 hover:bg-slate-800 flex' key={x} onClick={()=>searchEvents(x)}> {x} </button>)}
            </div>
            <div className='flex-col max-h-screen w-auto overflow-x-hidden overflow-y-auto'>  <div>{ event.length + ' Results' }</div>
            {event && event.sort((a,b) =>  b.blockNumber - a.blockNumber ).map((ev, index) => <div key={index + 'out'} className='p-4'> 
            <div className='grid border-2 rounded-md grid-cols-4'>
                <div className='p-1 border-2 col-span-1'>{'tx hash:'}</div><div className='p-1 border-2 col-span-3'>{ev.transactionHash}</div>
                <div className='p-1 border-2 col-span-1'>{'block:'}</div><div className='p-1 border-2 col-span-3'>{ev.blockNumber}</div>
                {ev.results.map((res, index2) => 
                <div className='col-span-4 grid grid-cols-4 ' key={index + 'sub' + index2}>
                    <div className='border-2 p-1 col-span-1'> {res[0] + ": "} </div>
                    <div className='border-2 p-1 col-span-3'> {String(res[1])} </div>
                    </div>
           
                 ) }
            </div>
            </div>)}
            
            </div>
            </div>
          
            </div>}

        
        
    </div>
  )
}

export default SearchTx