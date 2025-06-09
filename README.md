
 # local-library-portal
# 📚 Local Library Portal

A full-stack web application designed to manage a local library system, allowing users to browse, borrow, and return books 
---

## 🚀 Features

- User registration and login with authentication
- Book filtering
- Borrowing and return system with due dates
- Dashboard to see books, return date
- Error handling and user-friendly alerts

---

## 🛠️ Tech Stack

**Frontend:**
- React.js 
- Axios
- TailwindCSS / Material UI (adjust based on project)

**Backend:**
- Node.js with Express.js
- RESTful API
- JWT Authentication

**Database:**
- MongoDB 
---

## 🧰 Installation

Clone the repository:

git clone https://github.com/durgasahu24/local-library-portal.git
cd local-library-portal


cd frontend
npm install
# Create a .env file based on .env.example
npm run dev

cd backend
npm install

npm run dev

PORT=4000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key



﻿# local-library-portal
## 📬 Postman API Collection

Easily explore and test all available API endpoints with our Postman collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/your-workspace-name/workspace/local-library/collection/YOUR_COLLECTION_ID)

---

## 📚 API Endpoints Overview

### 🔐 Auth Routes

| Method | Endpoint                           | Description        |
|--------|------------------------------------|--------------------|
| POST   | `/api/v1/auth/register`            | Register a new user |
| POST   | `/api/v1/auth/login`               | Login a user        |
| GET    | `/api/v1/auth/logout`              | Logout user         |

---

### 📘 Book Routes

| Method | Endpoint                                           | Description                   |
|--------|----------------------------------------------------|-------------------------------|
| GET    | `/api/v1/book/allBooks`                            | Get all books                 |
| GET    | `/api/v1/book/getBookById/:id`                     | Get book by ID                |
| POST   | `/api/v1/book/borrowBook/:bookId`                  | Borrow a book                 |
| GET    | `/api/v1/book/borrowBooks`                         | Get borrowed books            |
| GET    | `/api/v1/book/filter?genre=&author=&rating=`       | Filter books by criteria      |

---

### ✍️ Review Routes

| Method | Endpoint                                                               | Description             |
|--------|------------------------------------------------------------------------|-------------------------|
| POST   | `/api/v1/review/:bookId/createReview`                                  | Submit a book review    |
| GET    | `/api/v1/review/:bookId`                                               | Get reviews for a book  |

---

## 🔄 How to Use

1. Click the **Run in Postman** button above.
2. Import the collection into Postman.
3. Use the included requests to interact with your local server: `http://localhost:4000`.

---

## 🧩 Sample Request (Register)

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "fullName": "alex",
  "email": "alex@gmail.com",
  "password": "alex123",
  "readerLevel": "Beginner"
}
