<div align="center">
  
# 🌾 AgroMart

### A Digital Platform for Agricultural Commerce

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

**Connecting Farmers Directly with Consumers | Eliminating Middlemen | Fair Prices for All**

[Live Demo](https://agro-mart-e2cb4.web.app) • [API Server](https://agro-mart-server.vercel.app) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Team](#-team)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌱 About The Project

**AgroMart** is a comprehensive e-commerce platform designed to revolutionize the agricultural marketplace by connecting farmers directly with consumers, businesses, and industrial buyers. Our platform eliminates intermediaries, ensuring farmers receive fair compensation while consumers access fresh produce at competitive prices.

### 🎯 Project Goals

- Bridge the gap between farmers and consumers through digital innovation
- Eliminate middlemen to ensure fair pricing for both parties
- Create an accessible platform for rural and urban communities
- Improve agricultural supply chain efficiency
- Support sustainable agriculture practices

### 👥 Target Users

| User Type | Description |
|-----------|-------------|
| **Consumers** | Individuals seeking fresh, quality farm produce |
| **Farmers** | Agricultural producers looking to sell directly to market |
| **Businesses** | Restaurants, stores, and industrial buyers requiring bulk purchases |
| **Organizations** | Government bodies and NGOs supporting sustainable agriculture |

---

## ✨ Key Features

### Core Functionalities

| Feature | Status | Description |
|---------|--------|-------------|
| 🧑‍🌾 Farmer Registration & Profile | ✅ Complete | Comprehensive profile management with farm information |
| 📦 Product Listing & Management | ✅ Complete | Category-based listing with filtering and sorting |
| 🛒 Cart & Wishlist | ✅ Complete | Full shopping cart and wishlist functionality |
| 💳 Secure Payment Gateway | ✅ Complete | Bkash, Nagad, Stripe, and card payments |
| 📋 Order Management | ✅ Complete | Complete order processing and tracking |
| 🔍 Search, Filter & Pagination | ✅ Complete | Advanced product discovery features |
| 👤 Profile & Role Management | ✅ Complete | User profiles with admin role assignment |
| 🖨️ Print History & Orders | ✅ Complete | Exportable payment and order records (CSV) |
| 📱 Responsive Design | ✅ Complete | Mobile-friendly interface across all devices |
| 🌐 Multi-Language Support | ✅ Complete | Internationalization for global accessibility |
| ⭐ Reviews & Ratings | ✅ Complete | Customer feedback system |
| 🚚 Delivery & Logistics | 🔄 Pending | Delivery integration and tracking |
| 💱 Multi-Currency Support | 🔄 Pending | Auto-detection currency display |

### 🤖 Advanced AI Features

#### AI Crop Doctor
Intelligent crop disease detection system that analyzes uploaded images to identify plant diseases and recommend appropriate treatments.

```
📸 Upload Photo → 🔬 AI Analysis → 🩺 Disease Identification → 💊 Treatment Recommendations
```

#### Weather-Wise Farming
Smart weather-based decision support system for farmers:

- 🌤️ **Live Local Weather** — Real-time weather display for your region
- 🌾 **Crop Advice** — Weather-appropriate crop recommendations
- 🛠️ **Smart Product Suggestions** — Seeds, fertilizers, and tools aligned with conditions
- 📅 **7-Day Forecast** — Early planning tools for better farm management

---

## 🛠️ Technology Stack

### Frontend
<p>
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.6.1-764ABC?style=flat-square&logo=redux" alt="Redux" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/DaisyUI-5.0.3-5A0EF8?style=flat-square&logo=daisyui" alt="DaisyUI" />
  <img src="https://img.shields.io/badge/MUI-6.4.8-007FFF?style=flat-square&logo=mui" alt="MUI" />
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-4.21.2-000000?style=flat-square&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-6.14.2-47A248?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-9.0.2-000000?style=flat-square&logo=jsonwebtokens" alt="JWT" />
</p>

### Payment Integration
<p>
  <img src="https://img.shields.io/badge/Stripe-18.0.0-008CDD?style=flat-square&logo=stripe" alt="Stripe" />
  <img src="https://img.shields.io/badge/SSLCommerz-1.1.0-E2136E?style=flat-square" alt="SSLCommerz" />
</p>

### Additional Libraries

| Category | Libraries |
|----------|-----------|
| **State Management** | Redux Toolkit, React Query |
| **UI/Animation** | Framer Motion, Lottie React, Swiper, Keen Slider |
| **Authentication** | Firebase, JWT |
| **Data Visualization** | Recharts |
| **Internationalization** | i18next, i18next-browser-languagedetector |
| **PDF/Export** | jsPDF, html2canvas, react-csv, json2csv |
| **Utilities** | Axios, date-fns, lodash, uuid |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas connection)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ashraful2871/Agro-Mart.git
cd Agro-Mart
```

#### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_store_password
IS_LIVE=false
```

Start the backend server:
```bash
npm start
```

#### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

Start the development server:
```bash
npm run dev
```

#### 4. Access the Application
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 📁 Project Structure

```
agro-mart/
├── client/                    # Frontend React Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── redux/           # Redux store and slices
│   │   ├── utils/           # Utility functions
│   │   ├── locales/         # i18n translation files
│   │   └── App.jsx          # Root component
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Backend Node.js Application
│   ├── index.js             # Server entry point & all routes
│   ├── package.json
│   └── .env                 # Environment variables
│
└── README.md
```

---

## 📡 API Documentation

**Base URL:** `https://agro-mart-server.vercel.app` (Production) | `http://localhost:5000` (Development)

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/jwt` | Generate JWT token | ❌ |

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👤 User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users` | Register new user | ❌ |
| `GET` | `/users` | Get all users (paginated) | ❌ |
| `GET` | `/user/:email` | Get user by email | ❌ |
| `GET` | `/users/:uid` | Get user by UID | ✅ |
| `PATCH` | `/user/:id` | Update user profile | ❌ |
| `PUT` | `/user/role/:email` | Update user role | ❌ |
| `DELETE` | `/user/:id` | Delete user | ✅ |
| `GET` | `/user/role/:email` | Get user role | ✅ |
| `PATCH` | `/users/update-coupon-enabled` | Toggle coupon for all users | ❌ |

**GET `/users` Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 5 | Items per page |
| `search` | string | "" | Search by name, email, or phone |

---

### 📦 Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/products` | Create new product | ❌ |
| `GET` | `/products` | Get all products (filtered, sorted, paginated) | ❌ |
| `GET` | `/feature-product` | Get featured products (limit 10) | ❌ |
| `GET` | `/dashboard/product/:id` | Get single product by ID | ✅ |
| `PATCH` | `/dashboard/product-update/:id` | Update product | ✅ |
| `DELETE` | `/product/:id` | Delete product | ✅ |

**GET `/products` Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 6 | Items per page |
| `sort` | number | - | Sort by price (1 = asc, -1 = desc) |
| `searchQuery` | string | - | Search products by name |
| `selectedCategory` | string | - | Filter by category |

**Response:**
```json
{
  "totalItems": 100,
  "currentPage": 1,
  "totalPages": 17,
  "products": [...]
}
```

---

### 🛒 Cart Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/add-cart` | Add item to cart | ✅ |
| `GET` | `/all-cart-items/:email` | Get user's cart items | ✅ |
| `PATCH` | `/update-cart-item/:id` | Update cart item quantity | ✅ |
| `DELETE` | `/delete-cart-item/:id` | Remove item from cart | ✅ |

**POST `/add-cart` Request Body:**
```json
{
  "cartData": {
    "productId": "product_id",
    "userInfo": {
      "email": "user@example.com"
    },
    "quantity": 1,
    "price": 100,
    "name": "Product Name"
  }
}
```

---

### ❤️ Wishlist Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/add-wish` | Add item to wishlist | ✅ |
| `GET` | `/wishlist/:email` | Get user's wishlist | ✅ |
| `DELETE` | `/wishlist/:id` | Remove item from wishlist | ✅ |

---

### 💳 Payments

#### Stripe Integration

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/create-payment-intent` | Create Stripe payment intent | ✅ |
| `POST` | `/payments` | Process payment & save order | ✅ |

**POST `/create-payment-intent` Request Body:**
```json
{
  "totalAmount": 150.00
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx"
}
```

#### SSLCommerz Integration (Bkash, Nagad, Cards)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/init-payment` | Initialize SSLCommerz payment | ❌ |
| `POST` | `/payment/success` | Payment success callback | ❌ |
| `POST` | `/payment/fail` | Payment failure callback | ❌ |
| `POST` | `/payment/cancel` | Payment cancel callback | ❌ |
| `POST` | `/payment/ipn` | Instant Payment Notification | ❌ |

**POST `/init-payment` Request Body:**
```json
{
  "totalAmount": 1500,
  "cartItems": [...],
  "cartIds": ["cart_id_1", "cart_id_2"],
  "userInfo": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response:**
```json
{
  "GatewayPageURL": "https://sandbox.sslcommerz.com/...",
  "tran_id": "uuid-transaction-id"
}
```

---

### 📋 Order Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/orders` | Get all orders (filtered, paginated) | ❌ |
| `GET` | `/orders/:email` | Get orders by user email | ❌ |
| `PATCH` | `/orders/:id` | Update order status | ❌ |
| `GET` | `/orders/download` | Download all orders as CSV | ❌ |
| `GET` | `/orders/:id/download` | Download specific order as CSV | ❌ |

**GET `/orders` Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `email` | string | - | Filter by email |
| `status` | string | - | Filter by status |
| `method` | string | - | Filter by payment method |
| `orderLimit` | number | - | Filter orders from last N days |
| `startDate` | string | - | Filter start date (YYYY-MM-DD) |
| `endDate` | string | - | Filter end date (YYYY-MM-DD) |

**Response:**
```json
{
  "orders": [...],
  "totalOrders": 150,
  "totalPages": 15
}
```

---

### ⭐ Reviews

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/reviews` | Submit a review | ❌ |
| `GET` | `/reviews` | Get all reviews | ❌ |

---

### 📊 Admin Dashboard & Statistics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/admin-stats` | Get admin dashboard statistics | ❌ |
| `GET` | `/order-stats` | Get order statistics by status | ❌ |
| `GET` | `/weekly-sales` | Get daily sales data | ❌ |
| `GET` | `/best-selling-products` | Get best selling products | ❌ |

**GET `/admin-stats` Response:**
```json
{
  "today": { "revenue": 5000, "orders": 12 },
  "yesterday": { "revenue": 4500, "orders": 10 },
  "thisMonth": { "revenue": 150000, "orders": 320 },
  "allTime": { "revenue": 1500000, "orders": 5000 }
}
```

**GET `/order-stats` Response:**
```json
{
  "totalOrders": 500,
  "stats": [
    { "_id": "pending", "totalAmount": 50000, "totalOrders": 100 },
    { "_id": "completed", "totalAmount": 200000, "totalOrders": 350 },
    { "_id": "cancelled", "totalAmount": 25000, "totalOrders": 50 }
  ]
}
```

---

### 🔑 Authentication Header

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🗄️ Database Schema

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  role: String,          // "user" | "admin" | "farmer"
  couponEnabled: Boolean,
  createdAt: Date
}
```

#### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  description: String,
  stockQuantity: Number,
  image: String,
  addedBy: String,
  updatedAt: Date
}
```

#### Carts Collection
```javascript
{
  _id: ObjectId,
  productId: String,
  userInfo: {
    email: String,
    name: String
  },
  quantity: Number,
  price: Number,
  name: String
}
```

#### Wishes Collection
```javascript
{
  _id: ObjectId,
  productId: String,
  userInfo: {
    email: String,
    name: String
  }
}
```

#### Payments Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  totalAmount: Number,
  status: String,        // "VALID" | "pending" | "completed" | "cancelled"
  method: String,
  transactionId: String,
  cartIds: Array,
  cartItems: Array,
  productId: Array,
  date: String,
  invoiceNo: String,
  createdAt: Date
}
```

#### Reviews Collection
```javascript
{
  _id: ObjectId,
  reviews: Object
}
```

---

## 📸 Screenshots

<div align="center">

| Home Page | Product Listing |
|:---------:|:---------------:|
| ![Home](https://via.placeholder.com/400x250?text=Home+Page) | ![Products](https://via.placeholder.com/400x250?text=Product+Listing) |

| AI Crop Doctor | Weather Dashboard |
|:--------------:|:-----------------:|
| ![Crop Doctor](https://via.placeholder.com/400x250?text=AI+Crop+Doctor) | ![Weather](https://via.placeholder.com/400x250?text=Weather+Dashboard) |

| Admin Dashboard | Order Management |
|:---------------:|:----------------:|
| ![Dashboard](https://via.placeholder.com/400x250?text=Admin+Dashboard) | ![Orders](https://via.placeholder.com/400x250?text=Order+Management) |

</div>

> 📝 *Replace placeholder images with actual screenshots of your application*

---

## 👨‍💻 Team

<div align="center">

### 👑 Team Leader

| <img src="https://github.com/ashraful2871.png" width="130" height="130" style="border-radius:50%"/> |
|:---:|
| **Ashraful Islam** |
| [@ashraful2871](https://github.com/ashraful2871) |
| 🚀 **Team Leader & Lead Developer** |

---

### Project Contributors

| <img src="https://github.com/Tayebasultana.png" width="100" height="100" style="border-radius:50%"/> | <img src="https://github.com/aaliahammedpriom.png" width="100" height="100" style="border-radius:50%"/> | <img src="https://github.com/muntasir-mahmud-abdullah.png" width="100" height="100" style="border-radius:50%"/> |
|:---:|:---:|:---:|
| **Tayeba Sultana** | **Aalia Hammed Priom** | **Muntasir Mahmud Abdullah** |
| [@Tayebasultana](https://github.com/Tayebasultana) | [@aaliahammedpriom](https://github.com/aaliahammedpriom) | [@muntasir-mahmud-abdullah](https://github.com/muntasir-mahmud-abdullah) |
| Core Contributor | Contributor | Contributor |

</div>

---

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

## 📞 Contact & Support

If you have any questions or need support, please open an issue in the repository.

---

<div align="center">

### 🌾 Empowering Farmers, Connecting Communities

**AgroMart** — *The Future of Agricultural Commerce*

⭐ Star this repository if you find it helpful!

</div>
