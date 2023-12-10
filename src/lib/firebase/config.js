// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSIIh76CjwbMYuB-_aV48WuVUGaXHHSXY",
    authDomain: "z-tube-e6772.firebaseapp.com",
    projectId: "z-tube-e6772",
    storageBucket: "z-tube-e6772.appspot.com",
    messagingSenderId: "962360562008",
    appId: "1:962360562008:web:da4d96a69ced6d6821d52d",
    measurementId: "G-0QLQE5KHWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);