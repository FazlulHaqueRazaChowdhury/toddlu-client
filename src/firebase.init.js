
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbkMmssW3pQT0qzPGG87p_mwHQMPZjGsM",
    authDomain: "toddlu-2ce19.firebaseapp.com",
    projectId: "toddlu-2ce19",
    storageBucket: "toddlu-2ce19.appspot.com",
    messagingSenderId: "336589464407",
    appId: "1:336589464407:web:585e6902f932f1ef6f5412"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;