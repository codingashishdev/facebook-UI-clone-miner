# Facebook UI Clone - Social Share

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- npm or yarn

### Setup Steps

1. **Clone and Install Dependencies**

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install API dependencies
   cd ../api
   npm install
   ```

2. **Configure Database**

   ```bash
   cd api
   cp .env.example .env
   # Edit .env with your database credentials

   # Create database and run schema
   psql -U your_user -d your_database -f schema.sql
   ```

3. **Start Development Servers**

   ```bash
   # Terminal 1 - Start API (from api directory)
   npm run dev

   # Terminal 2 - Start Client (from client directory)
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8800

📖 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**

---

# Facebook UI Clone - Social Share

A full-stack social media application inspired by Facebook's UI, built with React, Node.js, Express, and PostgreSQL.

## 🎯 Project Overview

This is a feature-rich social media platform where users can:

- Register and authenticate
- Create and share posts with images
- Like and comment on posts
- Follow/unfollow other users
- View user profiles with cover and profile pictures
- Toggle between light and dark themes
- Update their profile information

## 🏗️ Architecture

### Frontend

- **Framework**: React 18
- **Styling**: SCSS with theme system
- **State Management**: React Context API (Auth, Dark Mode)
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios
- **Icons**: Material-UI Icons
- **Routing**: React Router v6

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Utilities**: Moment.js for timestamps

## 📁 Project Structure

```
facebook-UI-clone-miner/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   │   ├── navbar/
│   │   │   ├── leftBar/
│   │   │   ├── rightBar/
│   │   │   ├── post/
│   │   │   ├── posts/
│   │   │   ├── share/
│   │   │   ├── stories/
│   │   │   ├── comments/
│   │   │   └── update/
│   │   ├── pages/                  # Page components
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── profile/
│   │   ├── context/                # React Context (Auth, DarkMode)
│   │   ├── style.scss              # Global theme variables
│   │   ├── axios.js                # API configuration
│   │   └── App.js                  # Main app component
│   └── package.json
├── api/                            # Express Backend
│   ├── controllers/                # Business logic
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── post.js
│   │   ├── comment.js
│   │   ├── like.js
│   │   ├── relationship.js
│   │   └── story.js
│   ├── routes/                     # API endpoints
│   ├── db.js                       # Database connection
│   ├── index.js                    # Express server
│   ├── package.json
│   └── .env                        # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to API directory:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with database credentials:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=social_media_db
```

4. Start the server:

```bash
npm start
```

Server runs on `http://localhost:8800`

### Frontend Setup

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

App runs on `http://localhost:3000`

## 🔑 Key Features

### Authentication

- User registration with validation
- Secure login with JWT
- Password hashing with bcryptjs
- Session persistence with cookies

### Social Features

- Create posts with image uploads
- Like/unlike posts
- Comment on posts
- Follow/unfollow users
- View user profiles

### User Interface

- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Profile picture and cover image updates
- Real-time post feeds

## 🎨 Theme System

The app uses a SCSS theme mixin system with two themes:

**Light Theme:**

- Text: Black
- Background: White
- Accent: Dark Blue

**Dark Theme:**

- Text: Whitesmoke
- Background: #222
- Accent: White

## 📡 API Endpoints

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

Users:
GET    /api/users/find/:userId
PUT    /api/users

Posts:
GET    /api/posts
POST   /api/posts
DELETE /api/posts/:id

Comments:
GET    /api/comments
POST   /api/comments
DELETE /api/comments/:id

Likes:
GET    /api/likes
POST   /api/likes
DELETE /api/likes

Relationships:
GET    /api/relationships
POST   /api/relationships
DELETE /api/relationships

Upload:
POST   /api/upload
```

## 📦 Dependencies

### Frontend

- react, react-dom
- react-router-dom
- @tanstack/react-query
- axios
- sass
- @mui/material, @mui/icons-material
- moment

### Backend

- express
- pg (PostgreSQL)
- bcrypt, bcryptjs
- jsonwebtoken
- multer
- cors
- cookie-parser
- moment

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- HTTP-only cookies
- CORS protection
- Protected routes

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: max-width 480px
  - Tablet: max-width 960px
  - Desktop: 960px+

## 🛠️ Development

The project uses:

- Nodemon for auto-restarting backend
- React Scripts for frontend development
- SCSS for styling with mixins and variables

## 📝 License

ISC License

---

**Note:** This is a clone project for educational purposes, inspired by Facebook's UI/UX design.
