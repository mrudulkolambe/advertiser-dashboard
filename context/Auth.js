import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, ActionCodeOperation } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase_config";
import { useRouter } from "next/router";
import { collection, doc, getDocs, increment, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const router = useRouter()
	const [alert, setAlert] = useState('')
	const routes = [{ tag: 'Campaign Content', path: '/campaign-content' }, { tag: 'Campaign Settings', path: "/campaign-settings" }, { tag: 'Checkout', path: '/checkout' }, { tag: 'Inventory News', path: '/inventory-news' }, { tag: 'Case Studies', path: '/case-studies' }, { tag: 'Tracking Panel', path: '/tracking-panel' }]

	const handleSignOut = () => {
		signOut(auth).then(() => {
			setUser()
			router.push('/')
		}).catch((error) => {
			// An error happened.
		});
	}

	const handleSignIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				setUser(user)
				router.push('/campaign-content')
			})
			.catch((error) => {
				console.log(error.message)
				setAlert(error.message)
			});
	}

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "advertiser_database", user.uid), (doc) => {
				user.phoneNumber = doc.data().phone
			});
		}
	}, [user]);


	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const unsub = onSnapshot(doc(db, "advertiser_database", user.uid), (doc) => {
					user.phoneNumber = doc.data().phone
				});
				setUser(user)
			} else {
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
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, handleSignUp, alert, setAlert, routes }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
