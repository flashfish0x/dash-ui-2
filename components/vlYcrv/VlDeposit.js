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
			<div className='flex flex-col bg-slate-700 rounded-md p-5'> 
				<div className='flex flex-row'>
					<div className='flex-auto'>{'Vl Stuff'}</div>
					<div className='flex-auto'>
				 		{'balance: ' + balance}

				 

					</div>
				</div>

				{generalVl && <BalanceGraphic vlBasics={generalVl} />}
				
				
			</div>
		</div>
	)
}

export default VlDeposit