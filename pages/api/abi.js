import { checkTx } from '@/utils/ethUtils'
import React from 'react'
import {collection, doc, setDoc, getDoc} from "firebase/firestore"
import { fireDB } from '@/firebase/firebaseApp'
// import {useCollection} from "react-firebase-hooks/firestore"


// function firestoreTest() {

//     const [votes, votesLoading, votesError] = useCollection(
//         collection(fireDB, "test"),
//         {}
//       );
    
//       const saveNote = async () => {
//         await addDoc(collection(fireDB, "test"), {setted: rue});
//       }
    
    
//       if(!votesLoading && votes) {
        
//         votes.docs.map((doc) => console.log(doc.data()));
//       }
//       if(!votesLoading){
//         console.log(fireDB);
//       }
//   return (
//     <div><button onClick={saveNote}
//     >
//     Save Note
//   </button></div>
//   )
// }

export default async function handler(req, res) {
  // console.log(checkTx(req.body))
  const address = req.body.replace(/\"/g, "")
  console.log(address)

  const checksummed = checkTx(address)
  
  // 

  

  if(!checksummed){
    res.status(500).json({ message: 'not an address'}); 
  }else{
    const etherkey = process.env.REACT_APP_ETHERSCAN_API
    console.log(etherkey)

    const s = await getDoc(doc(fireDB, "abis", checksummed))
    let abi = s.data()
    console.log(abi)
    
    if(!abi){
      const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${checksummed}&apikey=${etherkey}`
      const s = await fetch(url).then(res => res.json())
      console.log(s)

      if(s.status === '1'){
        await setDoc(doc(collection(fireDB, "abis"), checksummed), {abi: s.result});
        abi = s.result
      }else{
        res.status(500).json({ message: s.result}); 
      }

    }else{
      abi = abi.abi
    }

   
    
    
    res.status(200).json({ message: abi}); 
  }
    
  }