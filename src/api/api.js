// src/api.js
import axios from "axios";

// Toggle this flag for local testing (no backend)
const USE_MOCK_API = true;

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend (used if mock is false)
});

// ---------------- MOCK API (for testing without backend) ----------------
if (USE_MOCK_API) {
  console.log("🧪 Using MOCK API mode");

  const mockDB = JSON.parse(localStorage.getItem("mockUsers")) || [
    { userId: "admin", password: "1234" },
  ];

  api.post = async (url, data) => {
    console.log("Mock API call:", url, data);

    if (url === "/login") {
      const user = mockDB.find(
        (u) => u.userId === data.userId && u.password === data.password
      );
      if (user) return { status: 200, data: { message: "Login successful" } };
      throw new Error("Invalid credentials");
    }

    if (url === "/register") {
      const exists = mockDB.some((u) => u.userId === data.userId);
      if (exists) throw new Error("User already exists");

      mockDB.push({ userId: data.userId, password: data.password });
      localStorage.setItem("mockUsers", JSON.stringify(mockDB));

      return { status: 201, data: { message: "User registered successfully" } };
    }

    throw new Error("Unknown endpoint");
  };
}

export default api;
