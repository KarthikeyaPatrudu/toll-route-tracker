authservice.jsx//
export async function loginUser(credentials) {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}