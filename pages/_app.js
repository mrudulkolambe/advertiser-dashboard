import { AuthContextProvider } from '../context/Auth'
import '../styles/globals.css'
import '../styles/Main.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <div className='fixed top-0 left-0 w-full bg-gradient-top h-11 -z-20'></div>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}

export default MyApp
