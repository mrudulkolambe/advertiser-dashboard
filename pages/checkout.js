import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAuthContext } from '../context/Auth'
import { collection, addDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from '../context/firebase_config';
import Spinner from '../components/Spinner'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';
import Head from 'next/head';

const Checkout = () => {
	const { data, setData, user, setAlert, file, setFile, initialState } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const handleFormInput = (evt) => {
		const value = evt.target.value;
		setData({
			...data,
			[evt.target.name]: value
		});
	}
	const handleSubmit = async () => {
		if (user) {
			setLoading(true)
			let obj = data
			obj.timestamp = Timestamp.now()
			await addDoc(collection(db, "advertiser_campaigns"), obj)
				.then((document) => {
					const storage = getStorage();
					const storageRef = ref(storage, `advertiser_campaigns/${document.id}`);
					const uploadTask = uploadBytesResumable(storageRef, file);
					uploadTask.on('state_changed',
						(snapshot) => {
							const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							console.log('Upload is ' + progress + '% done');
							switch (snapshot.state) {
								case 'paused':
									console.log('Upload is paused');
									break;
								case 'running':
									console.log('Upload is running');
									break;
							}
						},
						(error) => {
							setAlert('Something went wrong!')
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
								const docRef = doc(db, "advertiser_campaigns", document.id);
								await updateDoc(docRef, {
									image: downloadURL
								})
									.then(() => {
										setAlert('Campaign Added!')
										setLoading(false)
										setData(initialState)
										router.push('/campaign-content')
										setFile()
									})
							});
						}
					);
				})
				.catch((err) => {
					setAlert(err.message)
					setLoading(false)
				})
		}
	}
	return (
		<>
			<Head>
				<title>Advertiser | Checkout</title>
			</Head>
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
								<input type="text" onChange={handleFormInput} value={data.companyName} className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Company Name' name='companyName' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>First Name:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' onChange={handleFormInput} value={data.firstName} placeholder='First Name' name='firstName' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Last Name:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' onChange={handleFormInput} value={data.lastName} placeholder='Last Name' name='lastName' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Address (Line 1) :</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Address (Line 1)' onChange={handleFormInput} value={data.address1} name='address1' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Address (Line 2):</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Address (Line 2)' onChange={handleFormInput} value={data.address2} name='address2' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>City:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='City' onChange={handleFormInput} value={data.city} name='city' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>State:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='State' onChange={handleFormInput} value={data.state} name='state' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Zip Code:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Zip Code' onChange={handleFormInput} value={data.zipcode} name='zipcode' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Country:</label>
								<input type="text" className='p-3 border-2 rounded-lg w-full mt-1' placeholder='Country' onChange={handleFormInput} value={data.country} name='country' />
							</div>
						</div>
					</div>
					<div className='flex justify-center px-32 mt-4'>
						<button onClick={handleSubmit} className='font-bold text-white rounded-lg bg-gray-900 hover:bg-gray-700 duration-300 px-3 py-2 w-32'>{loading ? <Spinner /> : 'Submit'}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Checkout