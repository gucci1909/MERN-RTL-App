# 🌐 Full Stack Social Media Application

A modern full-stack social media app built with **React (Frontend)** and **Node.js + Express (Backend)** featuring authentication, post management, comments, likes, image uploads, caching, rate limiting, logging, and more.

---

## 📦 Tech Stack

### 🖥️ Frontend

- **React.js**
- **React Router**
- **Tailwind CSS**
- **i18next (for localization)**
- **Axios**

### 🛠️ Backend

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Redis** for caching
- **RabbitMQ** for messaging
- **Cloudinary** for image uploads
- **Winston + Morgan** for logging
- **Express Rate Limiter**

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── helper/
│   │   ├── logs/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── public/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── main.jsx
│   └── package.json
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- MongoDB
- Redis
- RabbitMQ
- Cloudinary account

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/gucci1909/MERN-RTL-App.git
cd MERN-RTL-App
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/social-media
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://localhost
```

Run the backend server:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Update `.env` inside `frontend/`:

```
VITE_API_BASE_URL=http://localhost:8080
```

Start the frontend dev server:

```bash
npm run dev
```

---

## 📌 Key Features

### 🔐 Authentication

- Signup / Login
- Role-based access control
- JWT-based token auth

### 📄 Post Management

- Create / Read posts
- Upload images with Cloudinary

### 💬 Comments & Likes

- Add/Delete comments
- Like/Unlike posts

### ⚙️ Backend Integrations

- ✅ Rate Limiting
- ✅ Redis Caching
- ✅ Logging via Winston & Morgan
- ✅ RabbitMQ support

### 🌐 Frontend Perks

- Smooth UI with TailwindCSS
- Fully responsive
- Language support with i18n
- Toast notifications

---

## 🔗 API Overview

| Action          | Endpoint                  | Method | Auth |
|-----------------|---------------------------|--------|------|
| User Signup     | `/api/user/signup`        | POST   | ❌   |
| User Login      | `/api/user/login`         | POST   | ❌   |
| Get Posts       | `/api/post`               | GET    | ✅   |
| Create Post     | `/api/post`               | POST   | ✅   |
| Like Post       | `/api/like/:postId`       | PATCH  | ✅   |
| Comment on Post | `/api/comment/:postId`    | POST   | ✅   |

> Auth = Authorization header with `Bearer <token>`

---

## 🧪 Testing

You can write tests under:

- `backend/src/__tests__/`
- `frontend/src/__tests__/`

