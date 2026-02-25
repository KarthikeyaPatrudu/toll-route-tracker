/* ===============================
   RIGHT PANEL FORM
=============================== */

.login-form {
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

.login-form h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 2px;
  text-align: left;
}

.login-form .subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 18px;
}

/* ===============================
   LABEL
=============================== */

.input-label {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: -6px;
}

/* ===============================
   INPUT GROUP (KEY PART)
=============================== */

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group input {
  width: 100%;
  height: 48px;
  padding: 0 14px 0 44px;
  border-radius: 10px;
  border: 1.5px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  background: #fff;
}

/* focus border (important) */
.input-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.08);
}

/* ===============================
   ICON (MONOCHROME)
=============================== */

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 16px;
  color: #9ca3af;
  pointer-events: none;
}

/* ===============================
   BUTTON (MATCH TELEMETRICS)
=============================== */

.login-form button {
  margin-top: 6px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #4f46e5, #6d28d9);
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-form button:hover {
  opacity: 0.92;
}

.login-form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ===============================
   ERROR
=============================== */

.error {
  color: #dc2626;
  font-size: 13px;
}