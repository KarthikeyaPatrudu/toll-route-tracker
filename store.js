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
}

.input-group {
  position: relative;
  margin-bottom: 18px;
}

.input-group input {
  width: 100%;
  height: 48px;
  padding: 0 14px;
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
    width: 90%;
    max-width: 360px;
  }
}