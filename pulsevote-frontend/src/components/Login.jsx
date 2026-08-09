import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const login = async () => {
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
        "/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);
      setSuccess("Successfully logged in.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed."
      );
    }
  };

  // CSP VIOLATION: Inline event handler (onclick attribute)
  // This is added as a ref to demonstrate CSP violation
  const handleCspTest = () => {
    console.log('CSP Violation: Inline event handler executed');
    // This would be triggered by an onclick in JSX which React handles differently
    // but we can simulate with eval which is also blocked
    try {
      eval("console.log('CSP Violation: eval() executed')");
    } catch (e) {
      console.log('CSP blocked eval():', e.message);
    }
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

      <button onClick={login}>
        Login
      </button>

      {/* CSP VIOLATION: Button with inline onclick (simulated via ref) */}
      <button
        onClick={handleCspTest}
        style={{ marginTop: '10px', background: '#ff6b6b' }}
      >
        Test CSP Violation (eval)
      </button>
    </div>
  );
}