import {utils } from "ethers"

function checkTx(tx){
    const tLower = String(tx).toLowerCase()
    
	const cs = utils.isAddress(tLower)

    if(cs){
        return utils.getAddress(tLower)
    }else{
        return ""
    }
}





export {checkTx}