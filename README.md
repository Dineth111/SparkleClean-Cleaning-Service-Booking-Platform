# SparkleClean Cleaning Service Booking Platform

## Project Overview

SparkleClean is a full-stack cleaning service booking platform with a React + Vite frontend, an Express + Mongoose backend, and MongoDB persistence. It lets customers browse services, submit bookings, and lets admins manage booking status through a protected dashboard.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express 5, Mongoose
- Database: MongoDB

## Setup Instructions

### Prerequisites

- Node.js installed locally
- MongoDB running locally or a MongoDB Atlas connection string

### Clone the repo

```bash
git clone <repo-url>
cd SparkleClean-Cleaning-Service-Booking-Platform
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a backend `.env` file with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cleaningservice
ADMIN_SECRET=admin123
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a frontend `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_SECRET=admin123
```

## API Documentation

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | `/api/services` | Get all services | No |
| POST | `/api/bookings` | Create a booking | No |
| GET | `/api/bookings` | Get all bookings | Yes (`x-admin-secret` header) |
| PATCH | `/api/bookings/:id` | Mark booking as completed | Yes |
| DELETE | `/api/bookings/:id` | Delete a booking | Yes |

## Admin Access

Visit `/admin` in the browser, enter the admin password, and log in to see the booking dashboard. The default secret should match the `ADMIN_SECRET` value in the backend and `VITE_ADMIN_SECRET` in the frontend.

## Environment Variables

### Backend

- `PORT`: Port for the Express server, typically `5000`
- `MONGO_URI` or `MONGODB_URI`: MongoDB connection string used by Mongoose
- `ADMIN_SECRET`: Secret required by the admin routes and dashboard login

### Frontend

- `VITE_API_BASE_URL`: Base URL for API requests, typically `http://localhost:5000`
- `VITE_ADMIN_SECRET`: Admin password used by the login form
