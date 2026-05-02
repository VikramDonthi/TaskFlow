# 🚀 TaskFlow – Team Task Management System

## 📌 Project Overview

**TaskFlow** is a full-stack web application designed to manage team projects efficiently. It allows users to create projects, assign tasks, track progress, and collaborate using task-based updates.

This system implements **Role-Based Access Control (RBAC)** and supports **real-time-like task progress tracking using comments/messages**.

---

## 🎯 Objectives

* Build a full-stack application using modern technologies
* Implement secure authentication and authorization
* Enable structured project and task management
* Provide clear task progress tracking with updates
* Deploy a live working application

---

## 🔥 Core Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Password hashing using bcrypt

---

### 👥 Role-Based Access Control (RBAC)

#### Roles:

* **Admin**
* **Member**

#### Permissions:

| Action             | Admin | Member |
| ------------------ | ----- | ------ |
| Create Project     | ✅     | ❌      |
| Add Members        | ✅     | ❌      |
| Assign Tasks       | ✅     | ❌      |
| View Tasks         | ✅     | ✅      |
| Update Task Status | ✅     | ✅      |
| Add Progress Msg   | ✅     | ✅      |

---

### 📁 Project Management

* Admin creates projects
* Adds team members
* Organizes tasks under projects

---

### ✅ Task Management

* Create and assign tasks
* Set deadlines
* Update task status:

  * pending
  * in-progress
  * completed

---

### 💬 Task Progress Messages (IMPORTANT FEATURE)

Each task contains a **comments section** for progress updates.

#### Example:

* “Started working on backend”
* “Completed API integration”
* “Testing completed”

---

### 📊 Dashboard

* Total tasks count
* Status distribution
* Overdue tasks
* Project progress (% completion)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS / CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Deployment

* Railway

---

## 🏗️ System Architecture

```id="archx"
Frontend (React)
     ↓
REST API (Express)
     ↓
Database (MongoDB)
```

---

## 🗄️ Database Schema

### User Model

```id="ux"
{
  name: String,
  email: String,
  password: String,
  role: "admin" | "member"
}
```

---

### Project Model

```id="px"
{
  name: String,
  description: String,
  createdBy: UserId,
  members: [UserId]
}
```

---

### Task Model

```id="tx"
{
  title: String,
  description: String,
  projectId: ProjectId,
  assignedTo: UserId,
  status: "pending" | "in-progress" | "completed",
  dueDate: Date,

  comments: [
    {
      userId: UserId,
      message: String,
      createdAt: Date
    }
  ]
}
```

---

## 🔐 Authentication System

### JWT Payload

```id="jwtx"
{
  id: userId,
  role: userRole
}
```

---

## 🔑 RBAC Middleware

```js id="rbacx"
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden");
  }
  next();
};
```

---

## 🔌 API Endpoints

### Auth

```id="apix1"
POST /api/auth/register
POST /api/auth/login
```

---

### Projects

```id="apix2"
POST /api/projects (Admin only)
GET  /api/projects
```

---

### Tasks

```id="apix3"
POST /api/tasks (Admin only)
GET  /api/tasks
PUT  /api/tasks/:id
```

---

### Comments (Progress Messages)

```id="apix4"
POST /api/tasks/:id/comment
```

---

## 🔄 Task Tracking Logic

### Status Tracking

* pending → in-progress → completed

---

### Progress Calculation

```js id="progx"
const total = tasks.length;
const completed = tasks.filter(t => t.status === "completed").length;
const progress = (completed / total) * 100;
```

---

### Overdue Tasks

```js id="overx"
const overdue = tasks.filter(
  t => new Date(t.dueDate) < new Date() &&
       t.status !== "completed"
);
```

---

## 💬 Comment System Logic

### Adding Comment

```js id="commentx"
task.comments.push({
  userId: req.user.id,
  message: req.body.message,
  createdAt: new Date()
});
```

---

### Important Design Rule

* Comments are stored **per task**
* Tasks belong to **projects**
* Prevents mixing of messages across projects

---

## 🎨 UI Requirements (FOR FULL MARKS)

### Must Include:

* Responsive design
* Navigation bar
* Dashboard cards:

  * Total tasks
  * Completed
  * Pending

---

### Task UI Must Show:

* Task title
* Status (color-coded)
* Due date
* Comments section

---

### Suggested Enhancements:

* Progress bar
* Timeline view for comments
* Clean card layout

---

## ⚙️ Setup Instructions

### Backend

```id="setupx1"
npm init -y
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
```

---

### Environment Variables

```id="setupx2"
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000
```

---

### Frontend

```id="setupx3"
npx create-react-app client
npm install axios
npm start
```

---

## 🚀 Deployment (MANDATORY)

### Railway

1. Push to GitHub
2. Connect repo to Railway
3. Add environment variables
4. Deploy backend and frontend 

---

## 📦 Submission Checklist

* ✅ Live URL (Railway)
* ✅ GitHub Repository
* ✅ README.md
* ✅ Demo Video

---

## 🎥 Demo Flow

1. User Login
2. Admin creates project
3. Admin assigns task
4. Member updates status
5. Member adds progress message
6. Dashboard reflects updates

---

## 🧪 Testing

* Test APIs using Postman
* Verify RBAC restrictions
* Validate all inputs

---

## ⚠️ Important Notes

* Focus on functionality
* Ensure RBAC works correctly
* Comments must not mix between tasks
* Deployment must be successful

---

## 📌 Conclusion

TaskFlow demonstrates:

* Full-stack development
* Secure authentication
* Role-based access control
* Task tracking with progress updates
* Real-world project management features

---

## 👨‍💻 Author

Vikram Reddy
B.Tech CSE

---
