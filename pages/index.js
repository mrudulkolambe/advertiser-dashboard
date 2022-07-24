import { useState } from 'react'
import Spinner from '../components/Spinner';
import { useAuthContext } from "../context/Auth";
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const { handleSignIn } = useAuthContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const signIn = () => {
    setLoading(true)
    handleSignIn(email, password)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
  return (
    <>
    <Head>
      <title>Advertiser | Profile Edit</title>
    </Head>
      <Sidebar />
      <Topbar />
      <div className='top-6 absolute left-position w-full h-20 bg-white rounded-tr-3xl'></div>
      <div className='bg-white hidden lg:flex left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center h-calc-height'>
        <div className='w-6/12 shadow-lg p-5 rounded-lg border'>
          <h1 className="text-center font-bold text-3xl mb-6">Advertiser Authentication</h1>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Email Id</label>
            <input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
          </div>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Password</label>
            <input id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
          </div>
          <div>
            <button disabled={loading} onClick={signIn} className='flex items-center justify-center text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-5 w-full'>{loading ? <Spinner /> : 'Sign In'}</button>
          </div>
          <div className='mt-3 font-bold text-right text-sm'>
            <p>Don&#39;t have an account? <Link href={'/signup'}>Sign Up</Link></p>
          </div>
        </div>
      </div>

      <div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full flex flex-col md:flex-row  justify-center items-center calc-height'>
        <div className='w-full shadow-lg p-3 rounded-lg mt-5'>
          <h1 className='mt-4 font-bold text-4xl'>Advertiser Authentication</h1>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Email Id</label>
            <input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
          </div>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Password</label>
            <input id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
          </div>
          <div>
            <button disabled={loading} onClick={signIn} className='text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-3 w-full'>{loading ? <Spinner /> : 'Sign Up'}</button>
          </div>
        </div>
      </div>
    </>
  )
}
