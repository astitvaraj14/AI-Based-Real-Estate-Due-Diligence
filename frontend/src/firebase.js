import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0RFVv6fMYj_GIbnce8YUZ9iqfDQFKZvQ",
  authDomain: "real-estate-due-diligenc-a0a9b.firebaseapp.com",
  projectId: "real-estate-due-diligenc-a0a9b",
  storageBucket: "real-estate-due-diligenc-a0a9b.firebasestorage.app",
  messagingSenderId: "688376259939",
  appId: "1:688376259939:web:66237c6ce7f517db02df56",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { RecaptchaVerifier };