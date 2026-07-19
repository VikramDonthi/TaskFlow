# TaskFlow - Full-Stack Project Management Platform

## Project Description for Portfolio

### Overview
**TaskFlow** is a premium, full-stack project management platform I developed that combines sophisticated **Glassmorphism UI design** with robust **Role-Based Access Control (RBAC)** to create an intuitive, human-centric productivity tool. Built for modern teams, TaskFlow transforms project management from a rigid administrative task into a fluid, collaborative experience.

### The Challenge
Modern teams struggle with project management tools that are either overly complex or lack the flexibility for human-centric collaboration. I set out to build a platform that:
- Bridges the gap between administrative control and team collaboration
- Provides a visually engaging experience without sacrificing functionality
- Implements granular access control while maintaining ease of use
- Creates meaningful progress tracking with humanistic communication features

### Technical Implementation

#### Architecture & Design Decisions
- **Microservices-ready backend** using Node.js and Express.js with MongoDB for flexible data modeling
- **JWT-based authentication** with custom middleware for role verification at every endpoint
- **Glassmorphism design system** using Tailwind CSS with custom CSS-in-JS for consistent UI primitives
- **Parallel data fetching** with `Promise.all` to optimize dashboard load times

#### Key Features I Engineered

**1. Intelligent RBAC System**
- Implemented a two-tier role system (Admin/Member) with granular permissions
- Built custom middleware that validates membership before any project data access
- Designed separate dashboard views with role-specific metrics and visibility

**2. Real-time Collaboration Features**
- Created activity logging system for human-readable progress updates
- Built status transition flows (Pending → In-Progress → Completed)
- Implemented personalized, time-based greetings and contextual messaging

**3. Performance Optimizations**
- Optimized component re-renders using React best practices
- Implemented efficient data fetching strategies for multi-component dashboards
- Designed responsive architecture that scales from mobile to desktop

**4. Visual Experience**
- Developed dynamic "blob" animations and mesh gradients for interactive backgrounds
- Created reusable Glassmorphism components using `backdrop-filter` and semi-transparent surfaces
- Built accessible UI with clear labeling and intuitive navigation patterns

### Technical Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB with Mongoose ODM
- **Authentication**: JWT with secure HTTP-only cookies
- **Styling**: Custom design system with Glassmorphism primitives

### Impact & Results
- **User Experience**: Created a visually stunning platform that makes productivity feel natural and enjoyable
- **Security**: Implemented enterprise-grade RBAC that protects sensitive data while enabling collaboration
- **Scalability**: Built with performance in mind, handling complex data relationships efficiently
- **Usability**: Designed with human-centric features that encourage team communication and progress transparency

### Key Achievements
- ✅ Built a complete authentication system with role-based permissions
- ✅ Created an interactive dashboard with real-time metrics and team performance tracking
- ✅ Implemented a custom design system from scratch with Glassmorphism aesthetics
- ✅ Developed responsive, accessible interfaces optimized for all devices
- ✅ Engineered efficient data fetching strategies for optimal performance

### Code Quality & Best Practices
- Modular component architecture for maintainability
- Consistent error handling and validation middleware
- Environment variable configuration for security
- Semantic HTML and accessible design patterns

---

**This project demonstrates my ability to:**
- Architect full-stack applications with modern technologies
- Implement complex authentication and authorization systems
- Create visually stunning, user-centered interfaces
- Write clean, maintainable, and scalable code
- Balance security requirements with user experience needs
- Build production-ready applications with attention to performance

---

*"TaskFlow represents my commitment to building software that doesn't just function well, but feels good to use. It's the intersection of robust engineering and thoughtful design."*
# 🚀 TaskFlow

**Streamline your team's workflow effortlessly.**

TaskFlow is a premium, full-stack project management platform built for modern teams. It combines high-end **Glassmorphism design** with robust **Role-Based Access Control (RBAC)** and a human-centric user experience to make productivity feel natural and beautiful.

---


## 🔐 Role-Based Access Control (RBAC)
TaskFlow distinguishes between two primary roles, ensuring security and organizational clarity:

| Feature | 👑 Admin User | 👥 Member User |
| :--- | :--- | :--- |
| **Project Creation** | ✅ Full Control | ❌ View Only |
| **Member Assignment** | ✅ Can add/remove members | ❌ View Only |
| **Task Management** | ✅ Create/Edit/Delete all tasks | ✅ Update status & Provide progress messages |
| **Team Performance** | ✅ View individual member stats | ❌ Private View |
| **Project Visibility** | ✅ Sees all projects | 👁️ Sees assigned projects only |
| **Dashboard** | 📊 Aggregated Team Overview | 📋 Personal Task Tracker |
| **Progress Updates** | ✅ Monitor all updates | ✅ Add humanistic status messages |

---

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
in rootfolder run npm start

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
App credentials
admin@taskflow.com
member2@taskflow.com
member2@taskflow.com
pass: Test@123
or user can register new .

---

**Developed with ❤️ by Vikram Donthi**
