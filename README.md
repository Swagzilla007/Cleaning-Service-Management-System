# Cleaning Service Management System

A modern web application for managing cleaning services, bookings, and customer interactions.

## Tech Stack

### Frontend

- React.js with Vite
- Material-UI (MUI) for UI components
- React Router for navigation
- Axios for API requests
- JWT for authentication
- Date-fns for date manipulation
- Emotion for styling

### Backend

- Node.js
- Express.js
- MySQL database
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites

- XAMPP (for MySQL and Apache)
- Node.js (v14 or higher)
- Web browser (Chrome/Firefox recommended)

### Database Setup

1. Start XAMPP Control Panel and start Apache and MySQL services
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database:

   - Click "New" in the left sidebar
   - Enter "cleaning_service_db" as database name
   - Click "Create"

4. Import Database Schema:

   - Select the "cleaning_service_db"
   - Click "Import" in the top menu
   - Click "Choose File" and select `Backend/database/schema.sql`
   - Click "Go" at the bottom to import

5. Import Test Data (Optional):
   - Stay in "cleaning_service_db"
   - Click "Import" again
   - Choose `Backend/database/test-data.sql`
   - Click "Go" to import test data

### Backend Setup

1. Open the backend folder in VS Code or your preferred editor
2. Copy `.env.example` to create `.env`:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cleaning_service_db
JWT_SECRET=your_jwt_secret_here
```

3. Open terminal in backend folder and run:

```bash
npm install
npm run dev
```

The backend server will start at `http://localhost:5000`

### Frontend Setup

1. Open a new terminal in the frontend folder
2. Install dependencies and start:

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## User Registration Guide

### Customer Registration

1. Click "Register" in the navigation bar
2. Fill in the form:
   - Username: Choose a username (min 3 characters)
   - Password: Create a password (min 6 characters)
   - Confirm Password: Re-enter your password
   - Leave "Register as Admin" unchecked
3. Click "Register" button
4. You'll be redirected to login after successful registration

### Admin Registration

1. Click "Admin Login" in the navigation bar
2. Click "Register" link on the admin login page
3. Fill in the form:
   - Username: Choose an admin username
   - Password: Create a password
   - Confirm Password: Re-enter password
   - Check "Register as Admin"
4. Click "Register" button
5. Use the admin credentials to login through the Admin Login page
