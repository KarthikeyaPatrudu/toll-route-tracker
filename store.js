.logo-row {
  display: flex;
  align-items: center;      /* ✅ vertical alignment */
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 24px;
}

/* left side (icon + text) */
.logo-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* brand icon */
.brand-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

/* brand text */
.logo {
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

/* collapse button */
.collapse-btn {
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}