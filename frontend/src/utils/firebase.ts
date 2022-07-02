import { initializeApp } from 'firebase/app';
import {
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBzDEu9e1bd1YVPneGeDkkxtwWObm4wVNY',
  authDomain: 'monoswap-38aa2.firebaseapp.com',
  projectId: 'monoswap-38aa2',
  storageBucket: 'monoswap-38aa2.appspot.com',
  messagingSenderId: '373755980897',
  appId: '1:373755980897:web:c56e03ed71ac38e471ce20',
  measurementId: 'G-N3M9FDP8J4',
}

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
