// PrepareSamples.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PrepareSamples() {
  const [sampleCount, setSampleCount] = useState("");
  const [samples, setSamples] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [notify, setNotify] = useState("");
  const [possibleSamples, setPossibleSamples] = useState(0);

  // Load samples & inventory
  useEffect(() => {
    const savedSamples = JSON.parse(localStorage.getItem("samples")) || [];
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setSamples(savedSamples);
    setInventory(savedInventory);

    if (savedInventory.length > 0) {
      const minPossible = Math.min(...savedInventory.map((i) => i.quantity));
      setPossibleSamples(minPossible);
    }
  }, []);

  const saveSamples = (data) => {
    setSamples(data);
    localStorage.setItem("samples", JSON.stringify(data));
  };

  const saveInventory = (updated) => {
    setInventory(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
    const minPossible = Math.min(...updated.map((i) => i.quantity));
    setPossibleSamples(minPossible);
  };

  const handlePrepare = () => {
    setError("");
    setNotify("");
    const count = Number(sampleCount);
    if (!count || count <= 0) {
      setError("Please enter a valid sample count.");
      return;
    }

    // Check possible limit
    const minPossible = Math.min(...inventory.map((i) => i.quantity));
    if (count > minPossible) {
      setError(`You can only prepare up to ${minPossible} samples based on current inventory.`);
      return;
    }

    // Deduct quantities equally
    const updatedInventory = inventory.map((item) => ({
      ...item,
      quantity: Math.max(0, item.quantity - count),
      lastUpdated: new Date().toLocaleString(),
    }));
    saveInventory(updatedInventory);

    // Create new samples
    const newSamples = Array.from({ length: count }, (_, i) => ({
      id: `S${samples.length + i + 1}`,
      status: "Prepared",
    }));

    const updatedSamples = [...samples, ...newSamples];
    saveSamples(updatedSamples);
    setSampleCount("");
    setNotify(`✅ Successfully prepared ${count} sample${count > 1 ? "s" : ""}.`);
  };

  const handleDelete = (index) => {
    const updated = samples.filter((_, i) => i !== index);
    saveSamples(updated);
  };

  const handleReset = () => {
    localStorage.removeItem("samples");
    setSamples([]);
    setNotify("All samples have been reset.");
  };

  const handlePossibleSampleClick = () => {
    setSampleCount(possibleSamples);
    setNotify(`Auto-filled with possible sample count: ${possibleSamples}`);
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="How many samples?"
            type="number"
            value={sampleCount}
            onChange={(e) => setSampleCount(e.target.value)}
            size="small"
            sx={{ width: 220 }}
          />
          <Button variant="contained" onClick={handlePrepare}>
            Prepare
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handlePossibleSampleClick}
          >
            Possible Samples ({possibleSamples})
          </Button>
          <Button variant="outlined" color="error" onClick={handleReset}>
            Reset All
          </Button>
        </Box>
      </Paper>

      {/* Notification and Error Messages */}
      {notify && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {notify}
        </Alert>
      )}
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {samples.length === 0 ? (
        <Typography color="text.secondary">
          No samples prepared yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {samples.map((s, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={s.id}>
              <Paper sx={{ p: 2, position: "relative" }}>
                <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
                  {s.id}
                </Typography>
                <Typography>Status: {s.status}</Typography>
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  color="error"
                  size="small"
                  onClick={() => handleDelete(index)}
                >
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
