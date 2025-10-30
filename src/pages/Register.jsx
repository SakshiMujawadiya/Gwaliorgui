// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({ userId: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!form.userId.trim() || !form.password.trim()) {
      setError("Fill all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // save a simple user to localStorage for demo
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ userId: form.userId, password: form.password });
      localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      navigate("/");
    }, 700);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2, color: "primary.main", fontWeight: 700 }}>
          Create New Account
        </Typography>

        <Box component="form" onSubmit={handleRegister}>
          <TextField fullWidth name="userId" label="User ID" margin="normal" value={form.userId} onChange={handleChange} />
          <TextField fullWidth name="password" label="Password" type="password" margin="normal" value={form.password} onChange={handleChange} />
          <TextField fullWidth name="confirmPassword" label="Confirm Password" type="password" margin="normal" value={form.confirmPassword} onChange={handleChange} />

          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 1 }} disabled={loading}>
            {loading ? <CircularProgress size={22} /> : "Register"}
          </Button>

          <Button fullWidth variant="text" onClick={() => navigate("/")}>Back to Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}
