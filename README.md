# Cleaning Service Booking Platform

## Setup Instructions

### Backend
- `cd backend`
- `npm install`
- Add `.env` file:
  - `PORT=5000`
  - `MONGO_URI=mongodb://localhost:27017/cleaningservice`
  - `ADMIN_SECRET=admin123`
- `npm run dev`

### Frontend
- `cd frontend`
- `npm install`
- Add `.env` file:
  - `VITE_API_BASE_URL=http://localhost:5000`
  - `VITE_ADMIN_SECRET=admin123`
- `npm run dev`

## API Documentation

### 1) Get all services
- **Method:** `GET`
- **URL:** `/api/services`
- **Headers:** None
- **Body:** None
- **Success Response (200):**
```json
[
  {
    "_id": "serviceId",
    "name": "Deep Clean",
    "description": "Full home deep cleaning service",
    "price": 120,
    "imageUrl": "https://...",
    "category": "Home"
  }
]
```

### 2) Create booking
- **Method:** `POST`
- **URL:** `/api/bookings`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "serviceId": "serviceObjectId",
  "serviceName": "Deep Clean",
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "address": "123 Main Street",
  "date": "2026-06-01",
  "time": "10:00"
}
```
- **Success Response (201):** Created booking object
- **Error Response (400/500):** Validation or server error message

### 3) Get all bookings (Admin)
- **Method:** `GET`
- **URL:** `/api/bookings`
- **Headers:** `x-admin-secret: admin123`
- **Body:** None
- **Success Response (200):** Array of bookings
- **Error Response (401/500):** Unauthorized or server error

### 4) Mark booking as completed (Admin)
- **Method:** `PATCH`
- **URL:** `/api/bookings/:id`
- **Headers:** `x-admin-secret: admin123`
- **Body:** Optional, server sets status to completed
- **Success Response (200):** Updated booking object
- **Error Response (401/404/500):** Unauthorized, not found, or server error

### 5) Delete booking (Admin)
- **Method:** `DELETE`
- **URL:** `/api/bookings/:id`
- **Headers:** `x-admin-secret: admin123`
- **Body:** None
- **Success Response (200):**
```json
{ "message": "Booking deleted successfully." }
```
- **Error Response (401/404/500):** Unauthorized, not found, or server error
