.login-container {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* LEFT */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-box {
  max-width: 320px;
}

.brand-box h1 {
  margin: 10px 0;
}

.brand-box ul {
  margin-top: 20px;
  line-height: 2;
  padding-left: 0;
  list-style: none;
}

/* RIGHT */
.login-right {
  flex: 1;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.login-form input {
  height: 42px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}

.login-form button {
  height: 44px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 13px;
}