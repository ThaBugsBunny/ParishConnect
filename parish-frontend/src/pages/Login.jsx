import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // 🔥 Store user properly for chat alignment
   // localStorage.setItem("user", username);
    localStorage.setItem("familyId", username);

    if (username === "ADMIN01" && password === "adminpass") {
      navigate("/admin-dashboard");
    } 
    else if (username.startsWith("HEAD_LECTORS") && password === "lectorpass") {
      navigate("/lector-head-dashboard");
    } 
    else if (username.startsWith("HEAD_ALTAR")) {
      navigate("/altar-head-dashboard");
    } 
    else if (username.startsWith("FAM101") && password === "familypass") {
      navigate("/family-profiles");
    } 
    else {
      setError("Invalid User ID or Password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-header">
        <h1>ParishConnect</h1>
        <p>Secure Access Portal</p>
      </div>

      <form className="login-card" onSubmit={handleLogin}>

        <h2>Sign In</h2>

        <p className="subtext">
          Enter your Unique ID and password provided by the parish office.
        </p>

        <label>Unique User ID</label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-row">
          <label>Password</label>
          <span className="forgot">Forgot Password?</span>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-submit">
          Sign In to Dashboard
        </button>

      </form>

      <div className="login-footer">
        <p>
          Credential issues? Please visit the parish office with your ID card.
        </p>

        <Link to="/" className="back-home">
          ← BACK TO HOME PAGE
        </Link>
      </div>

    </div>
  );
}

export default Login;