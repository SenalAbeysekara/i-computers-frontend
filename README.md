# 🚀 Isuru Computers (AKA I Computers) — Frontend

The frontend of **Isuru Computers**, also known as **I Computers**, a modern MERN e-commerce platform for browsing and ordering computer hardware products.

Built with **React + Vite**, this frontend includes authentication, product browsing, cart management, order flow, product reviews, admin pages, and a responsive modern UI.

---

## 🌐 Live Demo

**Frontend Live URL:** https://i-computers-frontend-three.vercel.app/

---

## 🧰 Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React

---

## ✨ Features

### 👤 User Features
- Register and login
- Google login
- Forgot password with OTP
- Reset password
- View and update profile
- Browse products
- Search products
- Add to cart
- Buy now
- Checkout flow
- View order history
- Product ratings and reviews
- Add review for a product
- Edit own review
- Delete own review
- Responsive UI

### 🛠️ Admin Features
- Admin dashboard
- Manage products
- Add new products
- Update products
- Delete products
- Order management
- Manage users
- Block and unblock users
- Change user roles
- View all product reviews
- Delete any review
- Edit reviews from product page

---

## 📁 Project Structure

```bash
i-computers-frontend
│
├── public
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root and add:

```env
VITE_API_URL=http://localhost:5000/api
```

### Production

```env
VITE_API_URL=your_backend_api_url_here
```

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd i-computers-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🔐 Authentication Features

- JWT-based login
- Token stored in local storage
- Protected routes for users
- Protected routes for admins
- Google authentication support
- OTP password reset flow

---

## ⭐ Product Reviews

This frontend includes a full review UI:

- Users can see all reviews for a specific product
- Logged-in users can add a rating and review
- Users can edit or delete only their own reviews
- Admin can edit or delete any review
- Admin can view all reviews from all products in the admin dashboard

---

## 🖼️ Main Pages

- Home page
- Products page
- Product overview page
- Cart page
- Checkout page
- Orders page
- Login page
- Register page
- Forgot password page
- Reset password page
- Admin dashboard
- Admin products page
- Admin users page
- Admin orders page
- Admin reviews page

---

## 🚀 Deployment

This frontend is deployed on **Vercel**.

### Frontend URL

```bash
https://i-computers-frontend-three.vercel.app/
```

---

## 🔗 API Connection

The frontend communicates with the backend using:

```env
VITE_API_URL
```

Example local API base URL:

```bash
http://localhost:5000/api
```

Example production API base URL:

```bash
your_backend_api_url_here
```

---

## 📦 Key Frontend Functionalities

- Product listing and filtering
- Product detail page with gallery
- Cart and checkout integration
- Review submission with clickable stars
- Review editing and deletion
- Toast notifications
- Responsive admin dashboard
- Smooth navigation with React Router

---

## 👨‍💻 Author

**Your Name Here**  
GitHub: https://github.com/your-github-username

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you like this project:

- Star the repository
- Fork the project
- Share it with others

---

## 🎯 Future Improvements

- Wishlist
- Payment gateway integration
- Product comparison
- Coupon system
- Better analytics dashboard
- Notifications system
- Order tracking
