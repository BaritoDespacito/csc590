// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQFo6wbChE2lyUDC1t6S-xBjTZ9Gs2ryc",
  authDomain: "my-ikea-app.firebaseapp.com",
  projectId: "my-ikea-app",
  storageBucket: "my-ikea-app.appspot.com",
  messagingSenderId: "75178719176",
  appId: "1:75178719176:web:ec1446a99c37a524ecb2fd",
  measurementId: "G-C48G9WGC84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);