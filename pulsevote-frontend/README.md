# PulseVote Frontend

A React + Vite frontend for the PulseVote application with authentication functionality.

## Features

- User registration with email and password
- User login with JWT token storage
- Protected dashboard route
- Conditional navigation based on authentication state
- Logout functionality
- Consistent dark/light theme styling

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Axios 1
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- PulseVote API running on `https://localhost:5000` (see backend repository)

### Installation

```bash
cd pulsevote-frontend
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with navigation
│   ├── Login.jsx           # Login form component
│   ├── ProtectedRoute.jsx  # Route guard for authenticated pages
│   └── Register.jsx        # Registration form component
├── pages/
│   ├── DashboardPage.jsx   # Protected dashboard page
│   ├── HomePage.jsx        # Landing page
│   ├── LoginPage.jsx       # Login page wrapper
│   ├── LogoutPage.jsx      # Logout page with redirect
│   └── RegisterPage.jsx    # Registration page wrapper
├── App.jsx                 # Route configuration
├── App.css                 # Component styles
├── main.jsx                # App entry point with BrowserRouter
└── index.css               # Global styles & CSS variables
```

## API Integration

The frontend communicates with the PulseVote API at `https://localhost:5000/api/auth`:

- `POST /register` - Register new user
- `POST /login` - Login user

The JWT token returned by the API is stored in `localStorage` and included in subsequent requests.

## Authentication Flow

1. User visits `/register` or `/login`
2. Submits credentials via Axios to the API
3. On success, JWT is stored in `localStorage`
4. Navigation updates to show Dashboard/Logout
5. Protected routes check for token in `localStorage`
6. Logout removes token and redirects to home

## Security Notes

- Frontend only checks for token existence (UI-level protection)
- API must validate JWT on every protected endpoint
- Never connect directly to MongoDB from the frontend
- All sensitive operations go through the backend API

## Research Summary

See [RESEARCH.md](RESEARCH.md) for a summary of key concepts:
- Axios, localStorage, React Router
- useState, useEffect
- Protected routes
- Why frontend shouldn't connect directly to MongoDB