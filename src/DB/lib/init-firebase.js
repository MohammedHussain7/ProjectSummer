// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
import { getStorage ,ref } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD7mSZbmem3GHl1BXMZu7lRTK-W04qcRQ",
  authDomain: "myapp-a82eb.firebaseapp.com",
  projectId: "myapp-a82eb",
  storageBucket: "myapp-a82eb.appspot.com",
  messagingSenderId: "760171912716", 
  appId: "1:760171912716:web:4c5f329164dad2d8469829",
  measurementId: "G-Y89KYSDDCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);   
const storage = getStorage(app)
const auth = getAuth(app)
ref(storage);

export {  storage,ref  }
export default auth