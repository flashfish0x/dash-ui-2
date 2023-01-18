import useRpcProvider from '@/context/useRpcProvider';
import { EventSearch } from '@/ethereum/eventSearch';
import { JsonRpcBatchProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'

function SearchTx({hash}) {

    const [abi, setAbi] = useState({})

    const [event, setEvents] = useState([])

    const [errs, setErrors] = useState("")
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
        EventSearch(abi, defaultProvider, eventName).then((answer) => {
            setEvents(answer)
            console.log(answer)
            console.log('eventsearchdone')
        })
        // console.log(eventName)
    }
    if(abi){
        console.log(abi)
    }


  return (
    <div>
        <h1>{`Searching ${hash}`}</h1>       

        {errs && <div className='grow p-10 text-center text-4xl text-red-600'> {String(errs)} </div>}
        {abi.filters && 
        
            <div className='p-4'>
                <h1 className='flex p-2 text-4xl'> {'Events'}</h1>
                <div className='grid grid-cols-2'>
                <div className='p-4 flex-col'>
            {Object.keys(abi.filters).filter(y=>y.includes('(')).map(x => <button className='p-2 m-2 shadow-md rounded-md bg-slate-400 hover:bg-slate-800 flex' key={x} onClick={()=>searchEvents(x)}> {x} </button>)}
            </div>
            <div className='flex-col'>  <div>{'results'}</div>
            {event && event.map((ev) => <div className='p-4'> {JSON.stringify(ev)}</div>)}
            
            </div>
            </div>
          
            </div>}

        
        
    </div>
  )
}

export default SearchTx