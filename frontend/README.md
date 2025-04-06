# 🌐 Connectify - Frontend

Connectify is a modern social media application where users can explore posts, share comments, and engage with others. Built with **React**, **Tailwind CSS**, **Flowbite**, and **Redux**, it features a clean UI, smooth user experience, and secure authentication.

---

## 🚀 Features

- 🔐 **Authentication**: Sign up and login functionality with secure token storage via Redux.
- 🌍 **i18n Support**: Multi-language support using `react-i18next`.
- 🏠 **Home Page**: Displays all user posts in a beautiful feed layout.
- 💬 **Comment System**: Users can add comments on posts. Comments will be visible only after approval by an admin.
- 👤 **Profile Section**: Users can view and manage their own profile.
- 🛠️ **Admin Dashboard**: Admins can review and approve user comments.

---

## 🛠️ Tech Stack

- ⚛️ React
- 🌬️ Tailwind CSS
- 🧩 Flowbite
- 🌐 React Router
- 🌍 React i18next
- 🗃️ Redux Toolkit

---

## 📁 Folder Structure

```
src/
│
├── allRoutes/          # Route definitions
├── components/         # Reusable UI components
│   ├── admin/
│   ├── auth/
│   ├── common/
│   ├── home/
│   ├── signup/
│   └── hooks/
├── pages/              # Core pages like Home, Auth, SignUp, AdminPortal
│   ├── Home.jsx
│   ├── Auth.jsx
│   ├── SignUp.jsx
│   └── AdminPortal.jsx
├── store/              # Redux store and slices
```

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gucci1909/MERN-RTL-App.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🌐 Environment Setup

Create a `.env` file in the root directory and add your API base URL:
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🌍 Internationalization

- Default language: English
- Language switch is supported and persists across pages
- Language is set to English automatically on the **Sign Up** page

---

## ✅ TODOs

- [x] Setup Login/Signup UI
- [x] Integrate Redux for storing user data and tokens
- [x] Create Home and Profile pages
- [x] Implement admin comment approval
- [ ] Unit and integration tests

> Made with ❤️ by Umang Arora
```
