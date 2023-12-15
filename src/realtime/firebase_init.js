// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvGAr1fZBUaApmus92EwtBIz9AAUFgFGc',
  authDomain: 'flavorwave-event.firebaseapp.com',
  databaseURL:
    'https://flavorwave-event-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'flavorwave-event',
  storageBucket: 'flavorwave-event.appspot.com',
  messagingSenderId: '458906727327',
  appId: '1:458906727327:web:48104ac3f87ec60f75c3aa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


