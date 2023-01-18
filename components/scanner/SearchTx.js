import { JsonRpcBatchProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'

function SearchTx({hash}) {

    const [abi, setAbi] = useState({})

    const [errs, setErrors] = useState("")

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

    if(abi){
        console.log(abi)
    }
  return (
    <div>
        <h1>{`Searching ${hash}`}</h1>       

        {errs && <div className='grow p-10 text-center text-4xl text-red-600'> {String(errs)} </div>}
        {abi.filters && 
            <div>
                <h1 className='p-2 text-4xl'> {'Events'}</h1>
            {Object.keys(abi.filters).filter(y=>y.includes('(')).map(x => <div> {x} </div>)}
            </div>}

        
        
    </div>
  )
}

export default SearchTx