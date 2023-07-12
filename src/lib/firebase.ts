import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "pokedex-430aa.firebaseapp.com",
	projectId: "pokedex-430aa",
	storageBucket: "pokedex-430aa.appspot.com",
	messagingSenderId: "239599933779",
	appId: "1:239599933779:web:6712a38e97a5c8567f69a6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
