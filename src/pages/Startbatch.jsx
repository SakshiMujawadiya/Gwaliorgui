// StartBatch.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StartBatch() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [form, setForm] = useState({
    batchName: "",
    date: "",
    startTime: "",
    endTime: "",
    batchSize: "",
  });
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("batches")) ||
      [
        {
          id: "B1",
          batchName: "Batch-01",
          date: "2025-05-10",
          startTime: "09:00",
          endTime: "11:15",
          batchSize: 20,
          status: "Prepared",
        },
      ];
    setBatches(saved);
  }, []);

  const saveBatches = (data) => {
    setBatches(data);
    localStorage.setItem("batches", JSON.stringify(data));
  };

  const handleOpen = () => {
    setForm({
      batchName: "",
      date: "",
      startTime: "",
      endTime: "",
      batchSize: "",
    });
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleOpenUpload = () => setOpenUploadModal(true);
  const handleCloseUpload = () => {
    setOpenUploadModal(false);
    setUploadImage(null);
    setUploadPreview(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadImage) {
      alert("Please select an image");
      return;
    }
    // Handle image upload here (send to server, etc.)
    console.log("Uploading image:", uploadImage);
    setSnackbar({
      open: true,
      severity: "success",
      message: "Image uploaded successfully!",
    });
    handleCloseUpload();
  };

  const handleCreate = () => {
    if (!form.batchName || !form.date || !form.batchSize) return;
    setSubmitting(true);
    setTimeout(() => {
      const newBatch = {
        id: `B${Date.now()}`,
        ...form,
        batchSize: Number(form.batchSize),
        status: "Prepared",
      };
      const updated = [newBatch, ...batches];
      saveBatches(updated);
      setSubmitting(false);
      setOpenModal(false);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Batch created successfully!",
      });
    }, 700);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this batch?")) return;
    const updated = batches.filter((b) => b.id !== id);
    saveBatches(updated);
    setSnackbar({
      open: true,
      severity: "success",
      message: "Batch deleted successfully!",
    });
  };

  const displayedBatches = batches.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: "1rem" }}>
      {/* Snackbar Alert */}
      {snackbar.open && (
        <Alert
          variant={
            snackbar.severity === "success" ? "success" : "danger"
          }
          dismissible
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          style={{ marginBottom: "1rem" }}
        >
          {snackbar.message}
        </Alert>
      )}

      <Row className="g-2">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h6 style={{ fontWeight: 700, margin: 0 }}>📋 Batch History</h6>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleOpen}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    ➕ Create New Batch
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleOpenUpload}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    📸 Upload Image
                  </Button>
                </div>
              </div>

              {/* Table Section */}
              {loading ? (
                <div
                  style={{
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner animation="border" />
                </div>
              ) : (
                <>
                  {/* Table */}
                  <div
                    style={{
                      overflowX: "auto",
                      marginBottom: "1rem",
                    }}
                  >
                    <Table striped hover responsive>
                      <thead style={{ backgroundColor: "#f9fafb" }}>
                        <tr>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            Sr.no
                          </th>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            Batch Name
                          </th>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            Date
                          </th>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            Start Time
                          </th>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            End Time
                          </th>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            Batch Size
                          </th>
                          <th style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            Status
                          </th>
                          <th
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batches.length === 0 ? (
                          <tr>
                            <td colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>
                              <span style={{ color: "#999" }}>No batches found</span>
                            </td>
                          </tr>
                        ) : (
                          displayedBatches.map((b, idx) => (
                            <tr key={b.id}>
                              <td>{page * rowsPerPage + idx + 1}</td>
                              <td>{b.batchName}</td>
                              <td>{b.date}</td>
                              <td>{b.startTime}</td>
                              <td>{b.endTime}</td>
                              <td>{b.batchSize}</td>
                              <td>
                                <span
                                  style={{
                                    padding: "0.4rem 0.8rem",
                                    borderRadius: "4px",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    backgroundColor:
                                      b.status === "Prepared"
                                        ? "#d4edda"
                                        : "#f8d7da",
                                    color:
                                      b.status === "Prepared"
                                        ? "#155724"
                                        : "#721c24",
                                  }}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  title="View"
                                  onClick={() =>
                                    (window.location.href = `/batches/${b.id}`)
                                  }
                                  style={{ marginRight: "0.5rem" }}
                                >
                                  👁️
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  title="Delete"
                                  onClick={() => handleDelete(b.id)}
                                >
                                  🗑️
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {batches.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "1rem",
                        borderTop: "1px solid #e0e0e0",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span>
                        Showing {page * rowsPerPage + 1} to{" "}
                        {Math.min(
                          (page + 1) * rowsPerPage,
                          batches.length
                        )} of {batches.length} entries
                      </span>

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <select
                          className="form-select"
                          style={{ width: "auto" }}
                          value={rowsPerPage}
                          onChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                          }}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                        </select>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          disabled={page === 0}
                          onClick={() => setPage(page - 1)}
                        >
                          ← Prev
                        </Button>

                        <span style={{ padding: "0.5rem" }}>
                          Page {page + 1}
                        </span>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          disabled={
                            (page + 1) * rowsPerPage >= batches.length
                          }
                          onClick={() => setPage(page + 1)}
                        >
                          Next →
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Dialog */}
      <Modal show={openModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-grid gap-3">
            <Form.Group>
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter batch name"
                value={form.batchName}
                onChange={(e) =>
                  setForm({ ...form, batchName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Batch Size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter batch size"
                value={form.batchSize}
                onChange={(e) =>
                  setForm({ ...form, batchSize: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={form.startTime}
                onChange={(e) =>
                  setForm({ ...form, startTime: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={form.endTime}
                onChange={(e) =>
                  setForm({ ...form, endTime: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "0.5rem" }}
                />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Upload Image Modal */}
      <Modal show={openUploadModal} onHide={handleCloseUpload} centered>
        <Modal.Header closeButton>
          <Modal.Title>📸 Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </Form.Group>

          {/* Image Preview */}
          {uploadPreview && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                Preview:
              </p>
              <img
                src={uploadPreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                }}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpload}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUploadSubmit}>
            ✓ Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}