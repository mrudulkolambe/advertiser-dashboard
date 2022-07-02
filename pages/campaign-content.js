import { useRouter } from 'next/router'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAuthContext } from '../context/Auth'

const CampaignContent = ({ edit }) => {
	const { data, setData, file, setFile } = useAuthContext()
	const handleLogoChange = (e) => {
		setFile(e.target.files[0])
	}
	const router = useRouter()

	const handleFormInput = (evt) => {
		const value = evt.target.value;
		setData({
			...data,
			[evt.target.name]: value
		});
	}
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='bg-white hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center h-calc-height'>
				<h1 className='font-bold text-4xl'>{edit ? 'View Campaign' : 'Create Campaign'}</h1>
				<div className='mt-12 px-4 w-full flex justify-between h-4/5'>
					<div className='w-1/2 h-full'>
						<div className='flex flex-col'>
							<label className='font-bold cursor-pointer' htmlFor='promotionURL'>Enter the page you want to promote: </label>
							<input onChange={handleFormInput} value={data.promotionURL} type="text" id="promotionURL" placeholder='http://www.my-url.com/design' className='outline-none w-3/4 px-3 py-2 rounded-lg border-2 border-gray-400 mt-2' name='promotionURL' />
							<p className='text-xs text-gray-500 mt-2'>*This can be an article, homepage or any URL.</p>
						</div>
						<div className='flex flex-col mt-12'>
							<label className='font-bold cursor-pointer' htmlFor='campaignLogo'>Upload the logo for campaign:</label>
							<input onChange={handleLogoChange} type="file" id="campaignLogo" placeholder='http://www.my-url.com/design' className='outline-none w-3/4 px-3 py-2 rounded-lg border border-gray-400 mt-2' name='promotionURL' />
						</div>
					</div>
					<div className='w-1/2 h-full'>
						<div className='flex flex-col items-center w-full mt-4'>
							<p className='font-bold text-2xl mb-2'>Preview</p>
							{
								file ? <img className='rounded-md aspect-video h-60 shadow-md' src={URL.createObjectURL(file)} alt="" /> : <div>nothing to show</div>
							}
						</div>
					</div>
				</div>
				<div className='flex justify-between px-32'>
					<button disabled onClick={() => { router.push('/campaign-settings') }} className='disabled:bg-gray-500 disabled:cursor-not-allowed font-bold text-white rounded-lg bg-gray-900 hover:bg-gray-700 duration-300 px-3 py-2 w-32'>Back</button>
					<button onClick={() => { router.push('/campaign-settings') }} className='font-bold text-white rounded-lg bg-gray-900 hover:bg-gray-700 duration-300 px-3 py-2 w-32'>Next</button>
				</div>
			</div>
		</>
	)
}

export default CampaignContent