import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDG4lKkEh80zNNy02s8uf7Ly7gQABn_Iaw",
  authDomain: "hr-portal-pro-961a6.firebaseapp.com",
  projectId: "hr-portal-pro-961a6",
  storageBucket: "hr-portal-pro-961a6.firebasestorage.app",
  messagingSenderId: "346662772647",
  appId: "1:346662772647:web:fb85e11fd1b1bb8102a082",
  measurementId: "G-FB6JW0PBSM"
};

// Demo credentials:
// Email: admin@company.com
// Password: password123

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;