# 🚀 TaskFlow – Team Task Management System

**TaskFlow** is a full-stack web application designed to manage team projects efficiently. It allows users to create projects, assign tasks, track progress, and collaborate using task-based updates.

## 🔥 Core Features

* **Authentication**: JWT-based user login & signup.
* **Role-Based Access Control (RBAC)**: Admin and Member roles with specific permissions.
* **Project Management**: Group tasks by project.
* **Task Tracking**: Monitor task statuses (pending, in-progress, completed).
* **Task Progress Messages**: Members can post updates on tasks, providing a comment history that enables progress tracking and collaboration.
* **Dashboard Metrics**: Includes metrics for Total Tasks, Completed Tasks, Pending Tasks, In-progress Tasks, Overdue Tasks, and Project Progress Percentage.

## 🔐 RBAC Enforcement
- Backend enforces role checks using middleware.
- Members cannot access admin routes.
- Unauthorized requests return HTTP 403 Forbidden.

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB (Mongoose).

## 🚀 Deployment Plan

- **Backend** deployed on **Railway**.
- Environment variables configured:
  - `MONGO_URI`
  - `JWT_SECRET`
- **Frontend** deployed on **Vercel/Netlify**.
- Application tested in a production environment.

## 🎥 Demo Coverage

The demonstration will include:
1. User authentication
2. Project creation (Admin)
3. Task assignment
4. Task progress updates
5. Comment system usage
6. Dashboard analytics

## ⚙️ Setup Instructions

### Backend Setup
```bash
cd backend
npm install
# Create a .env file based on the provided MONGO_URI and set JWT_SECRET
npm run dev # or node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
