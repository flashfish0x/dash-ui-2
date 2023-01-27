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
  const etherkey = process.env.REACT_APP_ETHERSCAN_API

  const checksummed = checkTx(address)
  
  // 
  
// let storageAddress = checksummed

// const storage = storages.find((so) => so.name === contractName)

// await sol2uml.addStorageValues(, storageAddress, storage, 'latest')




  

  if(!checksummed){
    res.status(500).json({ message: 'not an address'}); 
  }else{
    const etherkey = process.env.REACT_APP_ETHERSCAN_API
    // console.log(etherkey)

    const s = await getDoc(doc(fireDB, "contracts", checksummed))
    let abi = s.data()
    // console.log(abi)
    let storages
    
    if(!abi){
      // let options = {
      //   apiKey: etherkey,
      //   network: 'mainnet'
      // }
      // const sol2uml = require('sol2uml')
      
      // let { umlClasses, contractName } = await sol2uml.parserUmlClasses(checksummed, options)
      // // console.log("uml", umlClasses)
      // // console.log("contractName", contractName)

      // const storages = sol2uml.convertClasses2Storages(
      //   contractName,
      //   umlClasses,
      //   ""
      //   )

      // console.log("storages", storages)
      // console.log("storages", storages[0])
      // console.log('Calling etherscan')
      // const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${checksummed}&apikey=${etherkey}`
      // const s = await fetch(url).then(res => res.json())
      // console.log(s)
      

      const url2 = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${checksummed}&apikey=${etherkey}`
      const source = await fetch(url2).then(res => res.json())
      // console.log(source.result)
      // console.log(source.result[0].ABI)
      if(source.status === '1'){
        let options = {
          apiKey: etherkey,
          network: 'mainnet'
        }
        
        if(!source.result[0]["CompilerVersion"].startsWith('vyper') ){
          console.log(source.result[0]["CompilerVersion"])
          const sol2uml = require('sol2uml')
        
          let { umlClasses, contractName } = await sol2uml.parserUmlClasses(checksummed, options)
          // console.log("uml", umlClasses)
          // console.log("contractName", contractName)
        
          storages = sol2uml.convertClasses2Storages(
            contractName,
            umlClasses,
            ""
          )
          
          console.log("storages", storages)

        }
        
        // console.log("storages", storages[0])

        // var input = await createSolcImport(source.result[0])
        // console.log(Object.keys(input))
        // console.log(input)
        // var combined = {...input, ... source.result[0] }
        // console.log(combined)
        if(storages){
          source.result[0].storages = JSON.stringify(storages)
          storages = JSON.stringify(storages)
        }else{
          source.result[0].storages = {}
        }
        
        await setDoc(doc(collection(fireDB, "contracts"), checksummed), source.result[0]);
        // await setDoc(doc(collection(fireDB, "compiled"), checksummed), input);
        // solc.com
        
        abi = source.result[0].ABI
      }else{
        res.status(500).json({ message: source.result}); 
      }

    }else{
      console.log('Found in db')
      storages = abi.storages
      abi = abi.ABI
      
    }

   
    
    // console.log("storages", storages)
    
    res.status(200).json({ message: { abi:abi, storages: storages}}); 
  }

  async function createSolcImport(etherscan){
    console.log("started import")
    const solc = require('solc');
    const sol2uml = require('sol2uml')

    // const etherkey = process.env.REACT_APP_ETHERSCAN_API
    // const etherscanParser = new sol2uml.EtherscanParser(etherkey, "mainnet")

    // const { solidityCode, contractName } = etherscanParser.getSolidityCode()

    // sol2uml.convertClasses2Storages()
    


   

    // var source_str = etherscan["SourceCode"].join()
    // var input_json = JSON.parse( etherscan["CompilerVersion"].subString(1,-1))
    // console.log(typeof etherscan["SourceCode"])
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
    

    // console.log("input json", input_json)
    // console.log(typeof input_json)
    
    var compiler_str = etherscan["CompilerVersion"]
    let otu =  await new Promise((resolve) => {solc.loadRemoteVersion(compiler_str, async function(err, solcSnapshot){
      if (err){
        console.log('err', err)
      }else{
        input_json['settings']['outputSelection'] = {
          '*': {
            '*': ['evm.bytecode', 'userdoc']
          }
        }
        const outp = solcSnapshot.compile( JSON.stringify(input_json))
        console.log('here')

        var fs = require('fs');
        fs.writeFile("test.txt", outp, function(err) {
            if (err) {
                console.log("err", err);
            }
        });

        resolve(outp)
      }

    })
  })

    // console.log("end")
    // console.log(typeof otu)
    return otu

    
  }

  async function  getUmlClasses(contractAddress) {
    const { files, contractName } = await this.getSourceCode(contractAddress);
    let umlClasses = [];
    for (const file of files) {
        debug(`Parsing source file ${file.filename}`);
        const node = await this.parseSourceCode(file.code);
        const umlClass = (0, converterAST2Classes_1.convertAST2UmlClasses)(node, file.filename);
        umlClasses = umlClasses.concat(umlClass);
    }
    return {
        umlClasses,
        contractName,
    };
}

  
    
  }