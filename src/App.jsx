// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import StartBatch from "./pages/Startbatch"; // file name Startbatch.jsx

const theme = createTheme({
  palette: {
    primary: { main: "#3f237d" }, // deep purple (match screenshots)
    secondary: { main: "#1565c0" },
    background: { default: "#f5f6fa", paper: "#fff" },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/start-batch" element={<StartBatch />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
