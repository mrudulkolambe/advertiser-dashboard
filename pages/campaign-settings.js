import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const CampaignSettings = () => {
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='bg-white hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center h-calc-height overflow-scroll'>
				<h1 className='font-bold text-4xl'>Create Campaign</h1>
				<div className='flex w-full'>
					<div className='w-1/2 h-full p-2'>
						<div className="py-6 px-4 rounded-xl shadow-lg bg-white border-2 mt-3">
							<h1 className=' font-bold text-2xl'>Marketing Objective</h1>
							<p className='font-bold mt-2 text-gray-500'>What is your campaign's goal?</p>
							<select name="" id="" className='mt-1 p-3 rounded-lg border-2 w-full outline-none'>
								<option value="Lead Generation">Lead Generation</option>
							</select>
							<h1 className='mt-5 font-bold text-2xl'>Targeting</h1>
							<p className='font-bold mt-2 text-gray-500'>Where is your audience located?</p>
							<select name="" id="" className='mt-1 p-3 rounded-lg border-2 w-full outline-none'>
								<option value="Lead Generation">India</option>
							</select>
						</div>


						<div className="py-6 px-4 rounded-xl shadow-lg bg-white border-2 mt-10">
							<h1 className=' font-bold text-2xl'>Budgeting</h1>
							<p className='text-gray-500 mt-2'>Define the direct impact of your campaign's daily reach by setting your campaign budget</p>
							<p className='font-bold mt-2 text-gray-500'>Daily Budget</p>
							<input name="dailyBudget" id="" className='mt-1 p-3 rounded-lg border-2 w-full outline-none placeholder:font-bold' placeholder='Daily Budget' />
							<p className='font-bold mt-2 text-gray-500'>Cost Per Click (CPC)</p>
							<input name="costPerClick" id="" className='mt-1 p-3 rounded-lg border-2 w-full outline-none placeholder:font-bold' placeholder='Cost Per Click' />
						</div>
					</div>
					<div className='w-1/2 h-full'></div>
				</div>
				<div className='flex justify-between px-32 mt-4'>
					<button onClick={() => { router.push('/campaign-content') }} className='disabled:bg-gray-500 disabled:cursor-not-allowed font-bold text-white rounded-lg bg-gray-900 hover:bg-gray-700 duration-300 px-3 py-2 w-32'>Back</button>
					<button onClick={() => { router.push('/checkout') }} className='font-bold text-white rounded-lg bg-gray-900 hover:bg-gray-700 duration-300 px-3 py-2 w-32'>Next</button>
				</div>
			</div>
		</>
	)
}

export default CampaignSettings