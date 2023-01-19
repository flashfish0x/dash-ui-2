import React, { useState } from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import { checkTx } from '@/utils/ethUtils';
import SearchTx from '@/components/scanner/SearchTx';
import { StorageStuff } from '@/ethereum/eventSearch';
import useRpcProvider from '@/context/useRpcProvider';

export default function Scanner() {
    const [hash, setHash] = useState("");
    const [searchInput, setSearchInput] = useState(""); 

    const {defaultProvider} = useRpcProvider()

    

    function hashSubmit(e) {
        
        const checked = checkTx(searchInput)
        checked ? setHash(searchInput) : setHash("")
        console.log(searchInput, checked)
    }

    

  return (
    <div>
       
        <div className='grid grid-cols-3'>
            <div>{'address for testing: 0xAf73A48E1d7e8300C91fFB74b8f5e721fBFC5873 or 0x0b139682d5c9df3e735063f46fb98c689540cf3a'}</div>
            <div className='flex col-span-2 m-2 p-2 bg-slate-50 rounded-sm'>
               
                < input className='pl-5 grow text-black outline-none bg-transparent' type='text' onKeyDown={(e) => e.key === "Enter" ?  hashSubmit(e) : ""} onChange={(e) => setSearchInput(e.target.value)} placeholder='enter contract address' />
                <MagnifyingGlassIcon onClick={hashSubmit} className='text-slate-700 cursor-pointer w-6 h-6'></MagnifyingGlassIcon>
                
            </div>
          
        </div>
        {hash && <SearchTx hash={hash} />}


        
    </div>
  )
}
