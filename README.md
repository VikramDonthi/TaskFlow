# 🚀 TaskFlow

**Streamline your team's workflow effortlessly.**

TaskFlow is a premium, full-stack project management platform built for modern teams. It combines high-end **Glassmorphism design** with robust **Role-Based Access Control (RBAC)** and a human-centric user experience to make productivity feel natural and beautiful.

---

## ✨ Design Philosophy: "Humanistic Flow"
TaskFlow isn't just a tool; it's an experience.
- **Glassmorphism UI**: Semi-transparent surfaces, backdrop blurs, and soft shadows for a modern, airy feel.
- **Interactive Backgrounds**: Dynamic mesh gradients and moving "blobs" that bring the interface to life.
- **Personalized Experience**: Time-based greetings and human-centric copy tailored to the user's role.
- **Responsive & Accessible**: Optimized for all screen sizes with clear labeling and intuitive navigation.

---

## 🔐 Role-Based Access Control (RBAC)
TaskFlow distinguishes between two primary roles, ensuring security and organizational clarity:

| Feature | 👑 Admin User | 👥 Member User |
| :--- | :--- | :--- |
| **Project Creation** | ✅ Full Control | ❌ View Only |
| **Member Assignment** | ✅ Can add/remove members | ❌ View Only |
| **Task Management** | ✅ Create/Edit/Delete all tasks | ❌ View Assigned Only |
| **Team Performance** | ✅ View individual member stats | ❌ Private View |
| **Project Visibility** | ✅ Sees all projects | 👁️ Sees assigned projects only |
| **Dashboard** | 📊 Aggregated Team Overview | 📋 Personal Task Tracker |

---

## 🔥 Key Features

### 📊 Premium Dashboard
- **Real-time Metrics**: Track Projects, Active Tasks, Completed, In-Progress, and Overdue tasks.
- **Team Performance (Admin)**: A specialized, scrollable section showing individual member progress with visual progress bars.
- **Personalized Greeting**: Dynamic greetings (Good Morning/Afternoon) and live system status indicators.

### 📁 Project Management
- **Centralized Hub**: View all active projects with "Velocity" indicators (task counts).
- **In-Depth Editing**: Admins can dynamically update project mission descriptions and re-assign the squad on the fly.

### 📝 Task Tracking & Collaboration
- **Activity Logs**: Every task features a human-readable activity log for progress updates and comments.
- **Status Control**: Intuitive status transitions to move tasks from Pending to In-Progress or Completed.
- **Smart Labels**: Every data point (Due Date, Assignee) is clearly labeled for instant clarity.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons, Axios, Framer Motion (for transitions).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Auth**: JWT (JSON Web Tokens) with secure HTTP headers.
- **Styling**: Custom CSS-in-JS design system with Glassmorphism primitives.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Atlas or local instance)

### 1. Clone & Setup
```bash
git clone https://github.com/VikramDonthi/TaskFlow.git
cd TaskFlow
```

### 2. Backend Configuration
1. Navigate to the `backend` folder.
2. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

### 3. Frontend Configuration
1. Navigate to the `frontend` folder.
2. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

---

## 🏗️ Implementation Details

### Security
The backend uses customized middleware to verify JWT tokens and enforce role checks. Even if a user knows a Project ID, the server validates their membership before returning any data.

### Styling System
Instead of generic utilities, TaskFlow uses a refined theme in `index.css` that includes custom gradients, noise filters, and "Blob" animations. The `glass` class provides a consistent, reusable primitive for the semi-transparent UI.

### Performance
Used `Promise.all` for parallel data fetching in the dashboard to ensure fast load times, and optimized component re-renders for a snappy feel.

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a Pull Request.

---

**Developed with ❤️ by Vikram Donthi**
