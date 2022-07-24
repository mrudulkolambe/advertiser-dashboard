import Head from 'next/head'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const InventoryNews = () => {
	return (
		<>
			<Head>
				<title>Advertiser | Inventory News</title>
			</Head>
			<Sidebar />
			<Topbar />
			<div className='bg-white lg:flex left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 flex justify-center items-center h-calc-height'>
				<h1 className='font-bold text-5xl text-center'>Coming Soon</h1>
			</div>
		</>
	)
}

export default InventoryNews