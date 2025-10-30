// PrepareSamples.jsx
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PrepareSamples() {
  const [sampleCount, setSampleCount] = useState("");
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("samples")) || [];
    setSamples(saved);
  }, []);

  const saveSamples = (data) => {
    setSamples(data);
    localStorage.setItem("samples", JSON.stringify(data));
  };

  const handlePrepare = () => {
    const count = Number(sampleCount);
    if (!count || count <= 0) return;
    const newSamples = Array.from({ length: count }, (_, i) => ({ id: `S${samples.length + i + 1}`, status: "Pending" }));
    const updated = [...samples, ...newSamples];
    saveSamples(updated);
    setSampleCount("");
  };

  const handleDelete = (index) => {
    const updated = samples.filter((_, i) => i !== index);
    saveSamples(updated);
  };

  const handleReset = () => {
    localStorage.removeItem("samples");
    setSamples([]);
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <TextField label="How many samples?" type="number" value={sampleCount} onChange={(e) => setSampleCount(e.target.value)} size="small" sx={{ width: 220 }} />
          <Button variant="contained" onClick={handlePrepare}>Prepare</Button>
          <Button variant="outlined" color="error" onClick={handleReset}>Reset All</Button>
        </Box>
      </Paper>

      {samples.length === 0 ? (
        <Typography color="text.secondary">No samples prepared yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {samples.map((s, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={s.id}>
              <Paper sx={{ p: 2, position: "relative" }}>
                <Typography sx={{ fontWeight: 700, color: "primary.main" }}>{s.id}</Typography>
                <Typography>Status: {s.status}</Typography>

                <IconButton sx={{ position: "absolute", top: 8, right: 8 }} color="error" size="small" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
