// ProcessPage.jsx
import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography, LinearProgress } from "@mui/material";

export default function ProcessPage() {
  const [sampleId, setSampleId] = useState("");
  const [breakthroughPoint, setBreakthroughPoint] = useState("");
  const [startTime, setStartTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && progress < 100) {
      timer = setInterval(() => setProgress((p) => Math.min(p + 2, 100)), 500);
    }
    return () => clearInterval(timer);
  }, [isRunning, progress]);

  const handleStart = () => {
    if (!sampleId.trim() || !breakthroughPoint.trim()) return;
    setStartTime(new Date().toLocaleTimeString());
    setProgress(0);
    setIsRunning(true);
  };

  const handleEnd = () => {
    setIsRunning(false);
    setProgress(100);
  };

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: 700 }}>Process Samples</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Sample ID" value={sampleId} onChange={(e) => setSampleId(e.target.value)} />
          <TextField label="Breakthrough Point" value={breakthroughPoint} onChange={(e) => setBreakthroughPoint(e.target.value)} />
          <TextField label="Start Time" value={startTime} InputProps={{ readOnly: true }} />

          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 12, borderRadius: 2, "& .MuiLinearProgress-bar": { backgroundColor: "primary.main" } }} />
            <Typography sx={{ mt: 1 }}>{progress}% Complete</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleStart} disabled={isRunning}>Start Process</Button>
            <Button variant="outlined" color="error" onClick={handleEnd} disabled={!isRunning}>End Process</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
