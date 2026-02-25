.login-container {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* LEFT */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #6d28d9, #7c3aed); /* deeper purple tones */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left; /* center text alignment */
  padding: 40px;
}

.brand-box {
  max-width: 360px;
}

.brand-box h1 {
  margin: 16px 0 8px;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.5;
}

.brand-box p {
  font-size: 20px;
  margin-bottom: 20px;
  opacity: 0.9;
}

.brand-box ul {
  margin-top: 20px;
  line-height: 1.8;
  padding-left: 0;
  list-style: none;
  font-size: 20px;
}

.brand-box li {
  margin: 6px 0;
}

/* RIGHT */
.login-right {
  flex: 1;
  background: #ffffff; /* pure white background */
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

.login-form h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 4px;
}

.login-form .subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
}

.login-form input {
  height: 42px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.login-form button {
  height: 44px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #6d28d9, #7c3aed);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.login-form button:hover {
  opacity: 0.9;
}

.error {
  color: #dc2626;
  font-size: 13px;
}

.car-icon {
  width: 60px;
  height: auto;
  /* margin: 0 auto 16px; center the logo above text */
  display: block;
}
