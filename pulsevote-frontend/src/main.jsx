import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// CSP VIOLATION: Attempt to connect to unauthorized API endpoint
fetch('https://unauthorized-api.example.com/data')
  .then(() => console.log('Unauthorized API call succeeded (CSP violation!)'))
  .catch(err => console.log('CSP blocked unauthorized API call:', err.message));

// CSP VIOLATION: Attempt to load image from unauthorized source
const img = new Image();
img.src = 'https://external-images.example.com/tracking.png';
img.onload = () => console.log('CSP Violation: External image loaded!');
img.onerror = () => console.log('CSP blocked external image load');

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);