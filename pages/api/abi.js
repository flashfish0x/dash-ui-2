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
  // console.log(address)

  const checksummed = checkTx(address)
  
  // 

  

  if(!checksummed){
    res.status(500).json({ message: 'not an address'}); 
  }else{
    const etherkey = process.env.REACT_APP_ETHERSCAN_API
    // console.log(etherkey)

    const s = await getDoc(doc(fireDB, "contracts", checksummed))
    let abi = s.data()
    // console.log(abi)
    
    if(!abi){
      // console.log('Calling etherscan')
      // const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${checksummed}&apikey=${etherkey}`
      // const s = await fetch(url).then(res => res.json())
      // console.log(s)

      const url2 = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${checksummed}&apikey=${etherkey}`
      const source = await fetch(url2).then(res => res.json())
      // console.log(source.result)
      // console.log(source.result[0].ABI)
      if(source.status === '1'){
        
        // await setDoc(doc(collection(fireDB, "contracts"), checksummed), source.result[0]);
        // solc.com
        var input = createSolcImport(source.result[0])
        abi = source.result[0].ABI
      }else{
        res.status(500).json({ message: source.result}); 
      }

    }else{
      console.log('Found in db')
      abi = abi.ABI
    }

   
    
    
    res.status(200).json({ message: abi}); 
  }

  function createSolcImport(etherscan){
    console.log("started import")
    const solc = require('solc');
    


   

    // var source_str = etherscan["SourceCode"].join()
    // var input_json = JSON.parse( etherscan["CompilerVersion"].subString(1,-1))
    console.log(typeof etherscan["SourceCode"])
    var input_json = JSON.parse(String(etherscan["SourceCode"]).substring(1, etherscan["SourceCode"].length-1))
    


    var input = {
      language: 'Solidity',
      sources: input_json,
      settings: {
        optimizer: {
          enabled: true,
          runs: etherscan['Runs']
        }
      }
      
    }
    

    console.log("input json", input_json)
    console.log(typeof input_json)
    
    var compiler_str = etherscan["CompilerVersion"]
    solc.loadRemoteVersion(compiler_str, function(err, solcSnapshot){
      if (err){
        console.log(err)
      }else{
        const output = solcSnapshot.compile( JSON.stringify(input_json))
        console.log(output)
      }

    })

    
  }
    
  }