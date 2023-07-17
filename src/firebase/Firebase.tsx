/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBReHHoYGKw0GmGw2Q5dU_kKh7uePsPmEI",
  authDomain: "books-home.firebaseapp.com",
  projectId: "books-home",
  storageBucket: "books-home.appspot.com",
  messagingSenderId: "493742015824",
  appId: "1:493742015824:web:6450c125fcb116622cd855",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
