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

      {/* RIGHT PANEL */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>TeleMetrics</h2>
          <p className="subtitle">
            Sign in to access your dashboard
          </p>

          <input
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
