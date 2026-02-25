import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import carIcon from "../../assets/CHOLAFIN.NS.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /* ===============================
     REDIRECT AFTER LOGIN
  =============================== */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // ✅ FIXED (was /dashboard)
    }
  }, [isAuthenticated, navigate]);

  /* ===============================
     HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ===============================
     HANDLE SUBMIT
  =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  return (
    <div className="login-container">
      {/* ================= LEFT ================= */}
      <div className="login-left">
        <div className="brand-box">
          <img src={carIcon} alt="Car Icon" className="car-icon" />

          <h1>TeleMetrics</h1>
          <p>Real-time Vehicle Tracking & Analytics</p>

          <ul>
            <li>✔ Live GPS Tracking</li>
            <li>✔ Fleet Management</li>
            <li>✔ Advanced Analytics</li>
            <li>✔ Real-time Alerts</li>
          </ul>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>TeleMetrics</h2>
          <p className="subtitle">
            Sign in to access your dashboard
          </p>

          {/* EMAIL */}
          <div className="input-group">
            <span className="input-icon">✉️</span>
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
          <div className="input-group">
            <span className="input-icon">🔒</span>
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