// DisposeSamples.jsx
import React, { useState } from "react";
import { Box, Button, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DisposeSamples() {
  const [open, setOpen] = useState(false);
  const [disposedCount, setDisposedCount] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDispose = () => {
    const saved = JSON.parse(localStorage.getItem("samples")) || [];
    const count = saved.length;
    localStorage.removeItem("samples");
    setDisposedCount(count);
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: 700 }}>Dispose Samples</Typography>

      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography sx={{ mb: 2 }}>Safely Dispose All Prepared Samples</Typography>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>This action will permanently remove all sample records from the system.</Typography>

        <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={handleOpen}>Dispose All Samples</Button>

        {disposedCount > 0 && <Typography sx={{ mt: 2, color: "success.main" }}>✅ {disposedCount} samples disposed.</Typography>}
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Disposal</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to permanently remove all samples? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDispose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
