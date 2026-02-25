.login-container {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* ================= LEFT ================= */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.brand-box {
  max-width: 380px;
}

.car-icon {
  width: 56px;
  margin-bottom: 18px;
}

.brand-box h1 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
}

.brand-box p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
}

.brand-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.brand-box li {
  margin: 10px 0;
  font-size: 15px;
  opacity: 0.95;
}

/* ================= RIGHT ================= */
.login-right {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 380px;              /* 🔥 increased */
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: center;
}

.login-form h2 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 18px;
}

/* ================= INPUT GROUP ================= */
.input-group {
  position: relative;
  width: 100%;
}

.input-group input {
  width: 100%;
  height: 46px;
  padding: 0 14px 0 42px;   /* space for icon */
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.input-group input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

/* ICON INSIDE INPUT */
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9ca3af;
}

/* ================= BUTTON ================= */
.login-form button {
  height: 46px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
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

/* ================= ERROR ================= */
.error {
  color: #dc2626;
  font-size: 13px;
  text-align: left;
}