// ================= LOGIN API =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 TEMP MOCK LOGIN (for development)
    if (email === "admin@gmail.com" && password === "admin123") {
      return res.json({
        token: "mock-jwt-token",
        user: {
          email: "admin@gmail.com",
          name: "Admin User"
        }
      });
    }

    return res.status(401).json({
      error: "Invalid credentials"
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});