# 📱 Connectify Backend

A scalable Node.js backend for a social media app supporting user authentication, CRUD operations for posts, comments, likes, logging, caching, rate-limiting, and message queuing.

---

## 🚀 Features

- 🧑 Role-Based Authentication (User & Admin)
- ✍️ CRUD operations for Posts, Comments, and Likes
- 🧵 Modular Middleware (auth, validation, errors)
- ⚡ Express Rate Limiter
- 🗂️ Centralized Logging using Winston & Morgan
- 🛡️ Helmet and CORS for Security
- 📸 Image Uploads with Multer and Cloudinary
- ☁️ Redis Caching Integration
- 💬 RabbitMQ Messaging Support

---

## 📁 Folder Structure

```
src/
├── config/               # Environment and DB config
├── controllers/          # Request handlers (business logic)
├── files/                # Static/helper files
├── helper/               # Feature-specific helper utilities
├── logs/                 # Winston log configuration
├── middlewares/          # Custom middlewares (auth, errors, etc.)
├── models/               # Mongoose schemas
├── public/               # Static public assets
├── routes/               # Express routes for each feature
├── server.js             # Application entry point
```

---

## 🧑‍💻 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **Redis**
- **RabbitMQ**
- **Cloudinary**
- **JWT** for authentication
- **Helmet + CORS** for security
- **Winston + Morgan** for logging

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gucci1909/MERN-RTL-App.git
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
REDIS_URL=your_redis_connection_string
RABBITMQ_URL=your_rabbitmq_connection
```

---

## 🏁 Run the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## 🧪 Testing

```bash
npm test
```

Each module has its own test file under the `__tests__` folder.

---

## 🔗 API Endpoints Overview

| Feature   | Endpoint                 | Method | Auth Required |
|-----------|--------------------------|--------|----------------|
| Auth      | `/api/user/signup`       | POST   | ❌             |
| Auth      | `/api/user/login`        | POST   | ❌             |
| Post      | `/api/post/`             | GET    | ✅             |
| Post      | `/api/post/`             | POST   | ✅             |
| Comment   | `/api/comment/:postId`   | POST   | ✅             |
| Like      | `/api/like/:postId`      | PATCH  | ✅             |

> ✅ Requires `Authorization: Bearer <token>` header

---

## ⚙️ Middleware

- `authenticate.js` – Validates user token
- `authorise.js` – Handles role-based permissions
- `rateLimiter.js` – Applies rate limiting
- `errorHandler.js` – Handles errors across the app
- `uploadPhoto.js` – Manages file uploads using Multer

---

## 🔐 Roles

- **User**: Can create posts, like, comment
- **Admin**: Has elevated privileges like approving any comment

---
