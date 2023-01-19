import {  StorageStuff } from '@/ethereum/eventSearch';
import React, { useEffect, useState } from 'react'
import useRpcProvider from '@/context/useRpcProvider';

function StorageSearch({hash, setLoading}) {
    const {defaultProvider} = useRpcProvider()
    
    const [storage, setStorage] = useState([])

    // useEffect(() => {
    //     setStorage([])
    // }, [hash]);

    console.log(storage)
    function searchStorage(e) {

        if(storage.length > 0){
            setStorage([])
        }else{
            // setLoading(true)
            StorageStuff(defaultProvider, hash).then(x => {setStorage(x)})

        }
        
    }
  return (
    <div>
        <h1 className='flex p-2 text-4xl'> {'Storage'}</h1>
        <div className='flow'><button className='p-4 m-4 w-44 rounded-md bg-yellow-300 hover:bg-yellow-200' onClick={searchStorage}> {storage.length > 0 ? "x" : "Search Storage"}</button>

        </div>
        {storage && storage.map(x => <div key={x.key}> {JSON.stringify(x)} </div>)}

    </div>
  )
}

export default StorageSearch