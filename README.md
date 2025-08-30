# HR Portal Pro - Smart Workforce Management System

A comprehensive HR management solution built with React, Vite, and Firebase that solves real-world workforce challenges.

## 🚀 Features

### Core Functionality
- **Secure Authentication** - Firebase-powered login with role-based access
- **Employee Management** - Complete CRUD operations with advanced filtering
- **Leave Management** - Smart leave request system with approval workflows
- **Real-time Analytics** - Interactive dashboards with actionable insights
- **Responsive Design** - Mobile-first approach with modern UI/UX

### Advanced Capabilities
- **Smart Dashboard** - Real-time metrics and quick actions
- **Department Analytics** - Performance tracking by department
- **Attendance Monitoring** - Automated tracking with trend analysis
- **Leave Pattern Analysis** - Predictive insights for workforce planning
- **Performance Metrics** - Productivity and satisfaction tracking
- **Notification System** - Real-time updates and alerts

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HR_Portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication and Firestore
   - Copy your config to `src/firebase.js`

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Firebase Setup

1. **Authentication**
   - Enable Email/Password authentication
   - Create test users or use demo credentials

2. **Firestore Collections**
   ```
   employees/
   ├── {userId}
   │   ├── name: string
   │   ├── email: string
   │   ├── department: string
   │   ├── position: string
   │   ├── role: string
   │   └── createdAt: timestamp
   
   leaveRequests/
   ├── {requestId}
   │   ├── employeeName: string
   │   ├── type: string
   │   ├── startDate: string
   │   ├── endDate: string
   │   ├── status: string
   │   └── createdAt: timestamp
   ```

## 🎯 Real-World Problem Solving

### 1. **Workforce Visibility**
- Real-time employee tracking
- Department-wise performance metrics
- Attendance pattern analysis

### 2. **Leave Management Automation**
- Streamlined approval workflows
- Automated leave balance calculations
- Conflict detection for overlapping requests

### 3. **Data-Driven Decisions**
- Comprehensive analytics dashboard
- Predictive insights for HR planning
- Performance trend analysis

### 4. **Operational Efficiency**
- Reduced manual paperwork
- Automated notifications and reminders
- Centralized employee information

## 🔐 Demo Credentials

```
Email: admin@company.com
Password: password123
```

## 📱 Key Screens

1. **Dashboard** - Overview with KPIs and quick actions
2. **Employee Management** - Add, edit, delete, and filter employees
3. **Leave Management** - Request, approve, and track leave
4. **Analytics** - Charts, metrics, and insights

## 🚀 Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 🔮 Future Enhancements

- **Payroll Integration** - Salary management and calculations
- **Performance Reviews** - 360-degree feedback system
- **Training Management** - Course tracking and certifications
- **Mobile App** - React Native companion app
- **AI Insights** - Predictive analytics and recommendations
- **Integration APIs** - Connect with existing HR systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**Ginni Arora**
- BCA 3rd Year Student
- Full-Stack Developer
- Email: ginnia934@gmail.com
- LinkedIn: [linkedin.com/in/ginni-arora-8a8153289](https://www.linkedin.com/in/ginni-arora-8a8153289/)

---

*Built with ❤️ to solve real HR challenges and showcase modern web development skills.*