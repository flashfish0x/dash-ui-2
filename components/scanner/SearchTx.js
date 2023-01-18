import { JsonRpcBatchProvider } from '@ethersproject/providers'
import React, { useEffect, useState } from 'react'

function SearchTx({hash}) {

    const [abi, setAbi] = useState("")

    useEffect(() => {
        if(hash){
            fetch("/api/abi", {method: 'POST', body: JSON.stringify(hash)})
            .then(response => response.json()).then(r => {
                setAbi(r)
                console.log(r)
            })
            
        }

        
        }, [hash]);


  return (
    <div>
        <h1>{`Searching ${hash}`}</h1>       
        
        
    </div>
  )
}

export default SearchTx