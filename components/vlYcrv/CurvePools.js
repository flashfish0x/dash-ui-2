import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import useSWR from 'swr'

export default function CurvePools({curveGauges}) {

    const [searchInput, setSearchInput] = useState(""); 
    const [gaugeToVote, setGaugeToVote] = useState(""); 
    console.log(searchInput)
    // console.log('gauges', curveGauges)

    let x;
    

    
    


  return (
    <div className='m-4'>
        <div className='flex '>

        
        <div className='flex w-1/2 m-2 p-2 bg-slate-50 rounded-full'>
        <input className='pl-5 grow text-black outline-none bg-transparent' onChange={(e) => setSearchInput(e.target.value)} type='text' placeholder='Vote on Gauge' />
        <MagnifyingGlassIcon className='text-slate-700 w-6 h-6'></MagnifyingGlassIcon>
        </div>
        <input className='m-auto' type='text' placeholder='num votes'>

        </input>
        <button className='m-auto'>
            {'submit'}
        </button>
        </div>
        {searchInput && <div className='flex max-h-40 overflow-auto bg-slate-100 text-black  flex-col w-1/2'>
        {Object.values(curveGauges.data).filter(gauge => gauge.name.toLowerCase().includes(searchInput.toLowerCase()) ).map(gauge => (
                <button key={gauge.gauge}>
                {gauge.name} </button>
            ))    }
            </div>}
    {/* <table className='table-fixed  w-full'>
        <thead className='border-2'>
            <tr>
                <th>
                    {'Gauge'}
                </th>
                <th>
                    {'ss'}
                </th>
                <th>
                    {'Select'}
                </th>
            </tr>

        </thead>

        <tbody>
            {Object.values(curveGauges.data).map(gauge => (
                <tr key={gauge.gauge}>
                <td >{gauge.name} </td>
                <td></td>
                <td></td>
                </tr>
            ))    }

                

        </tbody>
        
    </table> */}
    </div>
  )
}


