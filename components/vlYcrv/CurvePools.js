import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import useSWR from 'swr'

export default function CurvePools({curveGauges, user}) {

    const [searchInput, setSearchInput] = useState(""); 
    const [gaugeToVote, setGaugeToVote] = useState([]); 
    const [nonce, updateNonce] = useState(0)


    // console.log(userNumVotes)
    // console.log('gauges', curveGauges)

    let x;
    

    function addGauge(gauge) {
        gauge.numVotes = 0
        setSearchInput("")
        if(!gaugeToVote.find(g => g.gauge === gauge.gauge)){
            setGaugeToVote(oldArray => [
                ...oldArray,
                gauge 
             ]);
        }
        
     }

    function removeGauge(gauge) {
        console.log(gauge)
        gauge.numVotes = 0
        setGaugeToVote(prev => prev.filter(g => g.gauge !== gauge.gauge));
    }
    function totalVotes(g){
        return gaugeToVote.reduce((partialSum, a) => g === a.gauge ? partialSum : partialSum + a.numVotes, 0)
    }

    
    function changedVotes(gauge, e) {
        console.log(e.target.value)
        const numV =  Number(e.target.value)

        if(numV <0){
            return
        }

        const tv = totalVotes(gauge.gauge)
        console.log(tv)
        if(tv + numV> user.balance){
            console.log('too many')
            return;
        }

        gauge.numVotes = numV
        

        updateNonce(n => n+1)
        
    }
    
    


  return (
    <div className='m-4'>
        {'Vote'}
        

        
        <div className='flex m-2 p-2 bg-slate-50 rounded-sm'>
        <input className='pl-5 grow text-black outline-none bg-transparent' onChange={(e) => setSearchInput(e.target.value)} type='text' placeholder='Vote on Gauge' />
        <MagnifyingGlassIcon className='text-slate-700 w-6 h-6'></MagnifyingGlassIcon>
        </div>
        
        

        {searchInput && <div className='absolute flex max-h-40 overflow-auto bg-slate-100 text-black  flex-col w-1/2'>
        {curveGauges.filter(gauge => gauge.name.toLowerCase().includes(searchInput.toLowerCase()) ).map(gauge => (
                <button className='hover:bg-slate-300' onClick={() => addGauge(gauge)} key={gauge.gauge}>
                {gauge.name} </button>
            ))    }
            </div>}

            <div className='flex space-x-2 p-2'>
            <div className='my-auto flex-col'><div>
            {'Votes so far: ' + totalVotes(1)}
        </div>
        <div className='my-auto'>

            {'Votes remaining: ' + (user.balance-totalVotes(1))}

            </div>
        </div>
        <div className='grow'></div>
        
        <button disabled={totalVotes(1) == 0} className='w-32 disabled:bg-slate-600 hover:bg-slate-400 bg-slate-200 p-3 rounded-md text-black m-auto'>
            {'submit'}
        </button>
        </div>
    {gaugeToVote.length > 0 && <table className='table-fixed  w-full'>
        <thead className='border-2'>
            <tr>
                <th>
                    {'Gauge'}
                </th>
                <th>
                    {'Votes'}
                </th>
                <th>
                    {'New Votes'}
                </th>
                <th>
                    {'Remove'}
                </th>
            </tr>

        </thead>

        <tbody>
            {gaugeToVote.map(gauge => (
                <tr  key={'t'+gauge.gauge}>
                <td className='border-2 m-auto' >{gauge.name} </td>
                <td className='border-2 m-auto' >{'0'}</td>
                <td className='border-2' ><input className='text-black' type='number' value={gauge.numVotes} onChange={(e) => changedVotes(gauge, e)}></input></td>
                <td className='border-2' ><button  onClick={() => removeGauge(gauge)}>x</button></td>
                </tr>
            ))    }

                

        </tbody>
        
    </table>}
    </div>
  )
}


