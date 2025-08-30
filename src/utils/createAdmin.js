import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const createAdminUser = async () => {
  try {
    // Create admin user in Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'admin@company.com', 
      'password123'
    );
    
    // Create admin profile in Firestore
    await setDoc(doc(db, 'employees', userCredential.user.uid), {
      name: 'Admin User',
      email: 'admin@company.com',
      department: 'Administration',
      position: 'System Administrator',
      phone: '+1-555-0000',
      role: 'admin',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    

    return true;
  } catch (error) {
    // Error handled by return false
    return false;
  }
};