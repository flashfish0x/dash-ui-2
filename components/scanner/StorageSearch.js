import {  StorageStuff } from '@/ethereum/eventSearch';
import React, { useEffect, useState } from 'react'
import useRpcProvider from '@/context/useRpcProvider';
import { ethers } from 'ethers';
import { connectFirestoreEmulator } from 'firebase/firestore';

function StorageSearch({hash, setLoading, storages}) {
    const {defaultProvider} = useRpcProvider()
    
    const [storage, setStorage] = useState([])

    useEffect(() => {
        setStorage([])
    }, [hash]);

    console.log(storage)
    function searchStorage(e) {

        if(storage.length > 0){
            setStorage([])
        }else{
            // setLoading(true)
            StorageStuff(defaultProvider, hash).then(x => {
                // console.log(storages[0].variables.length)
                for(let i = 0; i< x.length; i++){
                    
                    x[i].key = ethers.BigNumber.from(x[i].key)
                    let x_slot = x[i].key
                    // console.log('xs', x_slot)

                    if(!storages[0]){
                        continue
                    }
                    
                    for(let j = 0; j< storages[0].variables.length; j++){
                        
                        let s_slot =  ethers.BigNumber.from(storages[0].variables[j].fromSlot)
                        // console.log(s_slot, x_slot)
                        let t_slot =  ethers.BigNumber.from(storages[0].variables[j].toSlot)
                        
                        if(s_slot.lte(x_slot) && t_slot.gte(x_slot)){
                            if(x[i].storages){
                                x[i].storages.push(storages[0].variables[j])
                            }else{
                                x[i].storages = [storages[0].variables[j]]
                            }
                            
                        }

                    
                    }
                }

                console.log(x.length)
                setStorage(x)
            })

        }
        
    }
  return (
    <div>
        <h1 className='flex p-2 text-4xl'> {'Storage'}</h1>
        <div className='flow'><button className='p-4 m-4 w-44 rounded-md bg-yellow-300 hover:bg-yellow-200' onClick={searchStorage}> {storage.length > 0 ? "x" : "Search Storage"}</button>

        </div>
        {storage && storage.map(x => <div className='flex' key={x.key}> 
            <div>{ 'slot: '+ x.key.toHexString()} </div>
            {!x.storages && <div>{', value: ' + ethers.BigNumber.from(x.value).toHexString()} </div>}
            {x.storages && x.storages.map(y => {
                let v = ethers.utils.hexDataSlice(x.value, 32-(y.byteOffset + y.byteSize), 32-(y.byteOffset) )
                if(y.type === 'bool'){
                    if(v === '0x01'){
                        v = 'True'
                    }else{
                        v = 'False'
                    }
                }

               return <div key={x.key+JSON.stringify(y)} > {', Variable: ' + y.variable + ' : ' + v }</div>
            } )}
        </div>)}

    </div>
  )
}

export default StorageSearch