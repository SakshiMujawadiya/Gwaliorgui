import { useState } from "react";
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
import api from "../api/api";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", { userId, password });
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, color: "#3f237d", fontWeight: 600 }}
        >
          Sample Monitoring System
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="User ID"
            variant="outlined"
            margin="normal"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#3f237d" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/register")}
            sx={{ color: "#3f237d" }}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
