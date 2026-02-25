<form className="login-form" onSubmit={handleSubmit}>
  <h2>TeleMetrics</h2>
  <p className="subtitle">
    Sign in to access your dashboard
  </p>

  {/* EMAIL */}
  <label className="input-label">Email Address</label>
  <div className="input-group">
    <span className="input-icon">✉</span>
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
  <label className="input-label">Password</label>
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