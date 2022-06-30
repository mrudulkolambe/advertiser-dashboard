import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, ActionCodeOperation } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase_config";
import { useRouter } from "next/router";
import { collection, doc, getDocs, increment, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const router = useRouter()
	const [totalAmount, setTotalAmount] = useState(0)
	const [advertiserHoldAmount, setAdvertiserHoldAmount] = useState(0)
	const [applyForValidationData, setApplyForValidationData] = useState()
	const [alert, setAlert] = useState('')
	const [POC, setPOC] = useState()
	const [withdrawalAmount, setWithdrawalAmount] = useState(0)
	const [advertiserHoldData, setAdvertiserHoldData] = useState()
	const [holdData, setHoldData] = useState()

	const handleSignOut = () => {
		signOut(auth).then(() => {
			setUser()
			router.push('/')
		}).catch((error) => {
			// An error happened.
		});
	}
	const getTimeData = () => {
		let dateOBJ = new Date()
		let day = dateOBJ.getDate();
		let month = dateOBJ.getMonth() + 1;
		let year = dateOBJ.getFullYear();
		if (day <= 9) {
			day = `0${day}`
		}
		if (month <= 9) {
			month = `0${month}`
		}
		let dateString1 = `${day}-${month}-${year}`
		return dateString1
	}

	const handleSignIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				setUser(user)
				router.push('/')
			})
			.catch((error) => {
				console.log(error.message)
				setAlert(error.message)
			});
	}

	useEffect(() => {
		if (user) {
			console.log(user)
			let userData = user
			const unsub = onSnapshot(doc(db, "publisher_database", user.uid), (doc) => {
				userData.phone = doc.data().phone
				userData.kyc = doc.data().kyc
				userData.aadhaar = doc.data().aadhaar
				userData.pan = doc.data().pan
				userData.banker = doc.data().banker
				userData.appliedBanker = doc.data().appliedBanker
				userData.trackingURLs = doc.data().trackingURLs
				userData.advertiserHold = doc.data().advertiserHold
				userData.advertiserHoldData = doc.data().advertiserHoldData
				userData.holdData = doc.data().holdData
				userData.hold = doc.data().hold
				userData.requested_withdrawal = doc.data().requested_withdrawal
				userData.ready_for_withdrawal = doc.data().ready_for_withdrawal
				userData.completed = doc.data().completed
				userData.payment_records = doc.data().payment_records
				setUserData(doc.data())
			});
			setUserData(userData)
		}
	}, [user]);


	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const unsub = onSnapshot(doc(db, "advertiser_database", user.uid), (doc) => {
					user.phone = doc.data().phone
				});
				setUser(user)
				const unsub1 = onSnapshot(doc(db, 'POC', 'POC'), (doc) => {
					setPOC(doc.data())
				})
				//  
				let dateOBJ = new Date()
				const q1 = query(collection(db, "campaign_details"), where("publisher_id", "==", user.uid), where('hold_completed', '==', false));
				const querySnapshot1 = await getDocs(q1);
				let arr1 = [];
				let newDateObj = new Date()
				console.log(Date.now())
				querySnapshot1.forEach(async (document, i) => {
					console.log(document.data().advertiser_timestamp, newDateObj.getTime(), document.data().campaign_name)
					let obj = document.data()
					obj.id = document.id
					arr1.push(obj);
				});
				setHoldData(arr1)

				const q2 = query(collection(db, "campaign_details"), where("publisher_id", "==", user && user.uid), where('advertiser_hold_completed', '==', false), where('advertiser_timestamp', '<=', Date.now()));
				const querySnapshot2 = await getDocs(q2);
				let arr2 = [];
				querySnapshot2.forEach(async (document, i) => {
					let obj = document.data()
					obj.id = document.id
					arr2.push(obj);
				});
				setAdvertiserHoldData(arr2)

				if (!user) {
					if (router.pathname === '/' || router.pathname.includes('store') || router.pathname.includes(`banker-market/`)) {
						return
					}
					else {
						router.push('/')
					}
				}
			}
			else {
				router.push('/')
			}
		});
	}, []);

	const handleSignUp = (email, password, name, phone) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				updateProfile(user, {
					displayName: name,
					phoneNumber: phone.toString()
				}).then(async () => {
					console.log(user)
					await setDoc(doc(db, "advertiser_database", user.uid), { username: name, email: user.email, uid: user.uid, phone: phone, photoURL: '' })
				}).catch((error) => {
					console.log(error)
				});
			})
			.catch((error) => {
				setAlert(error.message)
			});
	}

	useEffect(() => {
		if (alert.length !== 0) {
			setTimeout(() => {
				setAlert('')
			}, 3000);
		}
	}, [alert]);

	return (
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, handleSignUp, alert, setAlert, totalAmount, setTotalAmount, advertiserHoldAmount, setUser, applyForValidationData, withdrawalAmount, setWithdrawalAmount, POC, userData, holdData, advertiserHoldData }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
