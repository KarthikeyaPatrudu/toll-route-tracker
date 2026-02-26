give me final login.css also same as above proffessional changes
.login-container {
  display: flex;
  height: 100vh;
  /* font-family: "Segoe UI", sans-serif; */
  font-family:  ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";;
}

/* LEFT */
/* .login-left {
  flex: 1;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left; 
  padding: 40px;

} */
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
  position: relative; /* needed for ::before overlay */
  /* background: linear-gradient(135deg, #911ebe, #9333ea); blue → purple */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 40px;
  overflow: hidden; /* ensures overlay stays inside */
}

.login-left::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%; 
  height: 200%;
  /* background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px); */
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: initial;
  background-size: 50px 50px;
  animation: moveBackground 20s linear infinite;
}


.brand-box {
  max-width: 360px;
}

.brand-box h1 {
  margin: 0px 0 8px;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.5;
}

.brand-box p {
  font-size: 20px;
  margin:0px 0px 48px;
  opacity: 0.9;
}

.brand-box ul {
  margin-top: 20px;
  line-height: 1.8;
  padding-left: 0;
  list-style: none;
  font-size: 18px;
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

/* .login-form {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
} */

.login-form {
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

/* .login-form h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 4px;
} */

.login-form h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0px 0px 8px;
  text-align: center;
  color: #1A202C;
  line-height: 1.5;
      margin-block-start: 26.56px;
      margin-block-end: 26.56px;
          /* margin-inline-start: 0px;
    margin-inline-end: 0px; */
    /* font-weight: bold; */
    /* unicode-bidi: isolate; */
        margin-bottom: 40px;

}



.login-form .subtitle {
  font-size: 16px;
  color: #718096;
  text-align: center;
  margin-top: -16px;
  margin-bottom: 36px;
}

.login-form input {
  height: 42px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

/* .login-form button {
  height: 44px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #6d28d9, #7c3aed);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
} */

.login-form button {
  margin-top: 6px;
  height: 48px;
  border: none;
  border-radius: 10px;
  /* background: linear-gradient(90deg, #4f46e5, #6d28d9); */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 16;
}

/* .login-form button:hover {
  opacity: 0.9;
} */

.login-form button:hover {
  opacity: 0.92;
}

.login-form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #df1515;
  font-size: 13px;
  text-align: center;
}

.car-icon {
  width: 60px;
  height: auto;
  /* margin: 0 auto 16px; center the logo above text */
  display: block;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: -6px;
      line-height: 1.5;

}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}
.input-group input {
  width: 100%;
  height: 48px;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  /* border: 1.5px solid #e5e7eb; */
  font-size: 12px;
  outline: none;
      transition: all 0.2s;
  background: #fff;
  font-weight: var(--font-weight-normal);
    line-height: 1.5;
    box-sizing: border-box;
    margin: 0;
    padding-block: 1px;
    padding-inline: 2px;
}

.input-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.08);
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group input {
  width: 100%;
  height: 42px;
  padding: 0 12px 0 36px; /* extra left padding for icon */
  border-radius: 6px;
  border: 1px solid #d1d5db;
  
}

.input-icon {
  position: absolute;
  left: 10px;
  color: #b0b2b6; /* gray tone */
  font-size: 16px;
}
