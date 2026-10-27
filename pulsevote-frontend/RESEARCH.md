# Authentication Frontend Research Summary

**Axios** is a promise-based HTTP client for making API requests from the browser or Node.js. It provides a clean API for sending asynchronous requests, handling responses, and managing errors with built-in support for interceptors and automatic JSON transformation.

**localStorage** is a Web Storage API that allows websites to store key-value pairs persistently in the user's browser. Unlike sessionStorage, data in localStorage persists across browser sessions and is not automatically cleared, making it suitable for storing authentication tokens like JWTs between page reloads.

**React Router** is the standard routing library for React applications that enables declarative, component-based navigation. It uses a `<Routes>` and `<Route>` structure to map URL paths to React components, supports nested routes, dynamic parameters, and programmatic navigation via hooks like `useNavigate`.

**useState** is a React hook that adds state to functional components, returning the current state value and a setter function to update it. **useEffect** is a hook for performing side effects (like data fetching, subscriptions, or DOM manipulation) after render, with an optional dependency array to control when the effect re-runs.

A **protected route** is a routing pattern that conditionally renders a component only if the user meets certain authentication criteria—typically checking for a valid token in localStorage or context. If unauthorized, it redirects to a login page instead of rendering the protected content.

A React frontend should never connect directly to MongoDB because exposing database credentials or connection strings in client-side code would allow anyone to read, modify, or delete all data. The frontend must communicate through a backend API that handles authentication, validation, and secure database operations.