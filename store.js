ok now major design parts are done .
    only some ui adjustments are there
if you see in the img the login page i have divided into two div login left and login right . i want them to equal widht share 50-50%
    right now you can see the right side part is some what big in widht. i am pasting css code and working code pls resolve.
    login.css:
/* ===============================
   LOGIN LAYOUT
================================ */

.login-container {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* ===============================
   LEFT PANEL (GRADIENT)
================================ */

@keyframes moveBackground {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(50px, 50px);
  }
}

.login-left {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  overflow: hidden;
}

.login-left::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 1px,
    transparent 1px
  );
  background-size: 50px 50px;
  animation: moveBackground 20s linear infinite;
}

/* brand */

.brand-box {
  max-width: 360px;
  position: relative;
  z-index: 1;
}

.car-icon {
  width: 56px;
  margin-bottom: 18px;
}

.brand-box h1 {
  margin: 0 0 8px;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.2;
}

.brand-box p {
  font-size: 18px;
  margin-bottom: 36px;
  opacity: 0.92;
}

.brand-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 2;
}

.brand-box li {
  opacity: 0.95;
}

/* ===============================
   RIGHT PANEL
================================ */

.login-right {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===============================
   FORM
================================ */

.login-form {
  width: 380px;
  display: flex;
  flex-direction: column;
}

.login-form h2 {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: #111827;
  margin-bottom: 6px;
}

.login-form .subtitle {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 32px;
}

/* ===============================
   INPUTS
================================ */

.input-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
  display: block;
}


.input-group {
  position: relative;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 16px;
  pointer-events: none;
  z-index: 2;
}

.input-group input {
  width: 100%;
  height: 48px;
  padding: 0 14px 0 42px; /* 👈 SPACE FOR ICON */
  border-radius: 10px;
  border: 1.5px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  transition: all 0.18s ease;
  background: #ffffff;
}

/* focus state — matches your image */

.input-group input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.08);
}

/* ===============================
   BUTTON
================================ */

.login-form button {
  margin-top: 6px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-form button:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

.login-form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* ===============================
   ERROR
================================ */

.error {
  color: #dc2626;
  font-size: 13px;
  text-align: center;
  margin-bottom: 8px;
}

/* ===============================
   RESPONSIVE (BONUS)
================================ */

@media (max-width: 900px) {
  .login-left {
    display: none;
  }

  .login-form {
    width: 100%;
    max-width: 360px;
  }
}

loginpage.jsx:

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKickstarter, FaLock } from "react-icons/fa";
import "../../styles/login.css";
import carIcon from "../../assets/CHOLAFIN.NS.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    state => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  //  redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  return (
     <div className="login-container">
      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="brand-box">
          <img src={carIcon} alt="Car Icon" className="car-icon" />
          <h1>TeleMatics</h1>
          <p>Real-time Vehicle Tracking & Analytics</p>



          <ul>
            <li>✔ Live GPS Tracking</li>
            <li>✔ Fleet Management</li>
            <li>✔ Advanced Analytics</li>
            <li>✔ Real-time Alerts</li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
  <h2>TeleMatics</h2>
  <p className="subtitle">
    Sign in to access your dashboard
  </p>

  {/* EMAIL */}
  <label className="input-label">Email Address</label>
  <div className="input-group">
     <FaEnvelope className="input-icon" />
    <input
      name="email"
      type="email"
      placeholder="Enter your email"
      value={form.email}
      onChange={handleChange}
      required
    />
  </div>

  {/* PASSWORD */}
  <label className="input-label">Password</label>
  <div className="input-group">
    <FaLock className="input-icon" />
    <input
      name="password"
      type="password"
      placeholder="Enter your password"
      value={form.password}
      onChange={handleChange}
      required
    />
  </div>

  {error && <p className="error">{error}</p>}

  <button type="submit" disabled={loading}>
    {loading ? "Signing in..." : "Sign In"}
  </button>
</form>
      </div>
    </div>
  );
}
