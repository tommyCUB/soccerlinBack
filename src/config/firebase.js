// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAafjx6JcDmnqt5JI7pUMhoDNhLlg9IWto",
  authDomain: "futbolin-1562713496752.firebaseapp.com",
  databaseURL: "https://futbolin-1562713496752.firebaseio.com",
  projectId: "futbolin-1562713496752",
  storageBucket: "futbolin-1562713496752.appspot.com",
  messagingSenderId: "819952676287",
  appId: "1:819952676287:web:3f14baf3801f51a2",
};

// Initialize Firebase
export const app = admin.initializeApp(firebaseConfig);
