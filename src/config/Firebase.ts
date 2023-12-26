// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQBOwyMO23NKQjTeEKPqGAgjZ1de1iT8E",
  authDomain: "movixreactts.firebaseapp.com",
  projectId: "movixreactts",
  storageBucket: "movixreactts.appspot.com",
  messagingSenderId: "1039096740978",
  appId: "1:1039096740978:web:a4cc6e5ff983e8ed9356eb",
  measurementId: "G-MR33NZ66Q7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth=getAuth(app)


// google auth provider
//  const google_provider=new GoogleAuthProvider()
// export const signGoogle=()=>signInWithPopup(auth,google_provider)

//firestore 
export const db = getFirestore(app);