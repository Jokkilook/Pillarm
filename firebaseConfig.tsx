// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHmHpoHLnL5lCaw5apRVUgGX7lVnIiAb4",
  authDomain: "pillarm-6c1e7.firebaseapp.com",
  projectId: "pillarm-6c1e7",
  storageBucket: "pillarm-6c1e7.appspot.com",
  messagingSenderId: "1057215566424",
  appId: "1:1057215566424:web:352f8b602cc9bdbc5a702d",
  measurementId: "G-T67KECJYNZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
