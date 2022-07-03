
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react'

export const firebaseConfig = {
  apiKey: 'AIzaSyBzDEu9e1bd1YVPneGeDkkxtwWObm4wVNY',
  authDomain: 'monoswap-38aa2.firebaseapp.com',
  projectId: 'monoswap-38aa2',
  storageBucket: 'monoswap-38aa2.appspot.com',
  messagingSenderId: '373755980897',
  appId: '1:373755980897:web:c56e03ed71ac38e471ce20',
  measurementId: 'G-N3M9FDP8J4',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);

export const firestoreAutoId = (): string => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};