# Social Media Microservices Project

A modern social media application built with a microservices architecture, featuring a React frontend and Node.js backend.

## Project Structure

```
├── client/                 # Frontend React application
│   └── vite-project/      # Vite-based React setup
├── controllers/           # Backend route controllers
├── database/             # Database configuration and models
├── models/               # Mongoose data models
├── routes/               # API route definitions
├── utils/                # Utility functions
├── app.js               # Main application entry point
├── docker-compose.yml   # Docker configuration
└── package.json         # Project dependencies
```

## Features

- User Authentication (JWT-based)
- Post Management
- Comment System
- User Profiles
- RESTful API Architecture
- MongoDB Database
- Docker Support

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled
- Environment variables with dotenv

### Frontend
- React 19
- Vite
- TailwindCSS
- Modern ES6+ JavaScript

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ahmed-175/threads-app.git
cd learn-microserversies
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client/vite-project
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
npm run server
```

2. Start the frontend development server:
```bash
cd client/vite-project
npm run dev
```

### Using Docker

To run the application using Docker:

```bash
docker-compose up
```

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/post` - Post management routes
- `/api/comment` - Comment management routes
- `/api/user` - User management routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

[Your Name/Organization] - [Your Contact Information] 