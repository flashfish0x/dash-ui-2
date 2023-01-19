import {  StorageStuff } from '@/ethereum/eventSearch';
import React, { useEffect, useState } from 'react'
import useRpcProvider from '@/context/useRpcProvider';

function StorageSearch({hash}) {
    const {defaultProvider} = useRpcProvider()

    const [storage, setStorage] = useState([])
    console.log(storage)
    function searchStorage(e) {

        
        StorageStuff(defaultProvider, hash).then(x => setStorage(x))
    }
  return (
    <div>
        <h1 className='flex p-2 text-4xl'> {'Storage'}</h1>
        <button className='p-4 m-4 rounded-md bg-yellow-300 hover:bg-yellow-200' onClick={searchStorage}> {'test'}</button>
        {storage && storage.map(x => <div key={x.key}> {JSON.stringify(x)} </div>)}

    </div>
  )
}

export default StorageSearch