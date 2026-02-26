# 🍔 Food Delivery App

A full-stack Food Delivery Application built with modern web technologies(Backend Part)  
This platform allows customers to order food, providers (restaurant owners) to manage their restaurants and food items, and admins to manage the system.

---

## 🚀 Tech Stack

- **Framework:** Express.js(Node.js)
- **Language:** TypeScript
- **Database:** (PostgreSQL)
- **ORM:** (Prisma)
- **Authentication:** (better-auth)
- **Environment Configuration:** dotenv (.env)

---

## 👥 User Roles

The system supports three roles:

- **Customer**
- **Provider (Restaurant Owner)**
- **Admin**

---

## ✨ Features

### 🔐 Authentication & Registration

- Users can register as:
  - Customer
  - Provider (Restaurant Owner)

#### Customer Capabilities:

- Update profile name
- Update profile photo
- Place multiple orders
- Cancel orders before delivery
- Track order status in dashboard

#### Provider Capabilities:

- Create provider profile
- Add restaurant details:
  - Restaurant name
  - Address
  - Phone number
  - Restaurant image
- Add food items:
  - Food name
  - Price
  - Image
  - Description
- View orders per food item
- View customer orders
- Update order status:
  - Preparing
  - Delivered

#### Admin Capabilities:

- Admin is seeded by the website owner
- Create food categories
- View all users and providers
- Suspend users/providers (feature planned, not yet implemented)

---

## 🛒 Order Flow

1. Customer logs in.
2. Customer selects food.
3. Customer places order.
4. Provider updates order status:
   - Preparing
   - Delivered
5. Customer can track order in dashboard.
6. Customer can cancel order before it is delivered.

## 📦 Getting Started

### 1. Clone the Repository

# follow the .env.example file for .env file
