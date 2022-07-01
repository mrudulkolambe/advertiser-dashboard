import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const Checkout = () => {
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='bg-white hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center h-calc-height overflow-scroll'>
				<h1 className='font-bold text-4xl'>Create Campaign</h1>
				<div className='w-3/4 m-auto border rounded-lg shadow-lg mt-12 p-5'>
					<h2 className='font-bold text-2xl'>Billing Information</h2>
					<div>
						<div>
							<div className='flex items-start flex-col'>
								<label className='font-bold mt-2 text-gray-500'>Campany Name:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Company Name' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>First Name:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='First Name' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Last Name:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Last Name' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Address (Line 1) :</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Address (Line 1)' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Address (Line 2):</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Address (Line 2)' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>City:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='City' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>State:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='State' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Zip Code:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Zip Code' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Country:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Country' />
							</div>
						</div>
					</div>
					<div className='flex justify-center px-32 mt-4'>
						<button className='font-bold text-white rounded-lg bg-gray-900 hover:bg-gray-700 duration-300 px-3 py-2 w-32'>Submit</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Checkout