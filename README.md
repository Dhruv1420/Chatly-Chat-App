# Real-time Chat Web Application

## Overview

This project is a Real-time Chat web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It leverages JWT-based authentication and Socket.io for real-time communication, offering advanced features such as live notifications, private chat, group chat with up to 100 members, instant file sharing (up to 10MB), typing indicators, infinite scrolling, and unread messages count.

## Features

### Real-time Features

- **User Authentication**: Sign up, log in, and log out functionalities using JWT for authentication.
- **Live Notifications**: Users receive instant notifications for new requests.
- **User Status**: See online/offline status of other users.
- **Private Chat**: Users can initiate one-on-one private chats securely.
- **Group Chat**: Chat rooms supporting up to 100 members simultaneously.
- **Instant File Sharing**: Share files up to 10MB instantly within chats.
- **Typing Indicators**: Shows when users are typing messages.
- **Infinite Scrolling**: Seamless loading of past messages as users scroll.
- **Unread Messages Count**: Displays unread message counts for each chat.

### Advanced Functionalities

- **Group Management**: Administrators can manage group settings and members.
- **Cloudinary Storage**: Integration for efficient file storage and retrieval.
- **Time-Sensitive Analytical Dashboard**: Provides real-time analytics accessible for 15 minutes with a secret key.

## Technologies Used

- **Frontend**:

  - React with Vite for fast development and building.
  - Redux Toolkit for efficient state management.
  - Material-UI for UI components and styling.
  - Socket.io-client for real-time WebSocket communication.
  - Other dependencies include Chart.js, Moment.js, Framer Motion, and Axios.

- **Backend**:
  - Node.js and Express.js for server-side logic.
  - MongoDB with Mongoose for scalable database management.
  - JWT for secure authentication.
  - Socket.io for real-time bidirectional event-based communication.

## Installation

- **Clone the repository**: `git clone https://github.com/Dhruv1420/Chatly-Chat-App`

- **Install Dependencies**:

  - For backend dependencies: `cd server npm install`
  - For frontend dependencies: `cd ../client npm install`

- **Set up Environment Variables**: Make sure to create a `.env` file in both directories:

  - _Backend_:

    - PORT = `3000 or any`
    - MONGO_URL = `mongodb://localhost:27017 or cloud uri`
    - JWT_SECRET = `use complex key`
    - ADMIN_SECRET_KEY = `use complex key`
    - NODE_ENV = `DEVELOPMENT`
    - CLIENT_URL = `client url`
    - CLOUDINARY_CLOUD_NAME = `cloudinary cloud name`
    - CLOUDINARY_API_KEY = `api key`
    - CLOUDINARY_API_SECRET = `secret api key`

  - _Frontend_
    - VITE_SERVER = `http://localhost:3000 or client url`

- **Run the development servers**:

  - For backend: `cd server npm run dev`
  - For frontend: `cd ../client npm run dev`

- Open your browser and navigate to `http://localhost:3000` (Change Port if it is other than 3000).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## Social Handles

- **Instagram** Click [Here](https://www.instagram.com/a_d_1420/)
- **Github** Click [Here](https://github.com/Dhruv1420)
- **LinkedIn** Click [Here](https://www.linkedin.com/in/dhruv1420/)

## Contact

For any questions or feedback, please contact on kirangupta1218@gmail.com
