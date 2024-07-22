// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1Ii0iLrByXDz3g7n6aPqNGvHiSS5_TQ",
  authDomain: "householdtypescript-7b64f.firebaseapp.com",
  projectId: "householdtypescript-7b64f",
  storageBucket: "householdtypescript-7b64f.appspot.com",
  messagingSenderId: "307576819999",
  appId: "1:307576819999:web:5ce35a6455c3ce9863a02a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ストレージの準備
const storage = getStorage(app);
// 認証オブジェクトの準備
const auth = getAuth(app);
// Google認証プロバイダの準備
const googleProvider = new GoogleAuthProvider();


export {db,auth,googleProvider,storage};