import '@/styles/globals.css'
import { RPCProviderContextApp } from '@/context/useRpcProvider'

export default function App({ Component, pageProps }) {
  
    
    return (
		<RPCProviderContextApp>
        	<Component {...pageProps} />
		</RPCProviderContextApp>

    )

  
}
