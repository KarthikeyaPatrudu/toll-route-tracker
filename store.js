/* ===============================
   INPUT GROUP (FIXED)
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

/* ICON — perfectly centered */

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

/* INPUT */

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

/* focus */

.input-group input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.08);
}