import React, {useEffect, useState} from 'react'
import BalanceGraphic from './BalanceGraphic';
import { VlGeneralDetails } from '@/ethereum/vlRead';
import useRPCProvider from '@/context/useRpcProvider';

function VlDeposit() {

	const {defaultProvider} = useRPCProvider();
	let [generalVl, setGeneralVl] = useState([]);
	const vl_position = 10;
	
	useEffect(() => {

		try{
			
			VlGeneralDetails( defaultProvider).then(v => { 
				setGeneralVl(v);
				console.log(v);
			});
                
			
		}catch{console.log('eth failed');}
		
	}, [defaultProvider]);

	const balance = 100; 

	return (
		<div>
			{/*deposit box*/}
			<div className='flex flex-row bg-slate-700 rounded-md p-5'> 
				<div>
				{'Vl Stuff'}
				<div>
				 {'balance: ' + balance}

				 {balance && <BalanceGraphic vl_position={vl_position} />}

				</div>

				</div>
				
			</div>
		</div>
	)
}

export default VlDeposit