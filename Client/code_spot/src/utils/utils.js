// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqdWzSNoLBXlhithxCFr3YkecTexmXf5A",
  authDomain: "codespot-fecfe.firebaseapp.com",
  projectId: "codespot-fecfe",
  storageBucket: "codespot-fecfe.appspot.com",
  messagingSenderId: "764583121213",
  appId: "1:764583121213:web:09134ce560a68946d97554",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage
export const firebaseStorage = getStorage(app);


export const days = (time) => {

  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Create a date object for the target date (in this case, April 10, 2023)
  const targetDate = new Date(time);

  // Get the epoch timestamp for the target date in seconds
  const targetTimestamp = Math.floor(targetDate.getTime());

  // Calculate the difference in days between the target date and the current date
  const daysLeft = Math.ceil(
    (targetTimestamp - currentTimestamp) / (60 * 60 * 24)
  );

  return daysLeft;
};