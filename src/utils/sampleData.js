import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addSampleData = async () => {
  try {
    // Sample employees
    const employees = [
      {
        name: 'Sarah Johnson',
        email: 'sarah@company.com',
        department: 'Engineering',
        position: 'Senior Developer',
        phone: '+1-555-0101',
        status: 'active',
        joinDate: '2023-01-15',
        role: 'employee'
      },
      {
        name: 'Mike Chen',
        email: 'mike@company.com',
        department: 'Marketing',
        position: 'Marketing Manager',
        phone: '+1-555-0102',
        status: 'active',
        joinDate: '2023-02-20',
        role: 'employee'
      },
      {
        name: 'Emma Davis',
        email: 'emma@company.com',
        department: 'HR',
        position: 'HR Specialist',
        phone: '+1-555-0103',
        status: 'active',
        joinDate: '2023-03-10',
        role: 'employee'
      }
    ];

    // Sample leave requests
    const leaveRequests = [
      {
        employeeName: 'Sarah Johnson',
        type: 'Annual Leave',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
        days: 6,
        reason: 'Family vacation',
        status: 'approved',
        department: 'Engineering',
        createdAt: new Date()
      },
      {
        employeeName: 'Mike Chen',
        type: 'Sick Leave',
        startDate: '2024-01-25',
        endDate: '2024-01-26',
        days: 2,
        reason: 'Medical appointment',
        status: 'pending',
        department: 'Marketing',
        createdAt: new Date()
      }
    ];

    // Add employees
    for (const employee of employees) {
      await addDoc(collection(db, 'employees'), {
        ...employee,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Add leave requests
    for (const request of leaveRequests) {
      await addDoc(collection(db, 'leaveRequests'), request);
    }

    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};