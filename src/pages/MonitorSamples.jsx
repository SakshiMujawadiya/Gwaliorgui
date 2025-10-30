// MonitorSamples.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MonitorSamples() {
  const [samples, setSamples] = useState([]);
  const [liveFeed, setLiveFeed] = useState({
    position: { x: 0, y: 0, z: 0 },
    temperature: 25,
    trayStatus: "In",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("samples")) || [];
    if (saved.length === 0) {
      const mock = Array.from({ length: 6 }, (_, i) => ({
        id: `S${i + 1}`,
        breakthroughTime: "01:36",
        status: Math.random() > 0.5 ? "Passed" : "Failed",
      }));
      setSamples(mock);
    } else {
      setSamples(
        saved.map((s, i) => ({
          id: s.id ?? `S${i + 1}`,
          ...s,
          breakthroughTime: s.breakthroughTime ?? "01:36",
          status: s.status ?? "Pending",
        }))
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFeed({
        position: {
          x: (Math.random() * 100).toFixed(1),
          y: (Math.random() * 100).toFixed(1),
          z: (Math.random() * 100).toFixed(1),
        },
        temperature: (20 + Math.random() * 10).toFixed(1),
        trayStatus: Math.random() > 0.5 ? "In" : "Out",
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <Row className="g-3">
        {/* Left Column - Live Stream & Batch Details */}
        <Col xs={12} md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* Live Stream Section */}
              <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
                📹 Live Stream
              </h6>

              {/* Black Video Area */}
              <div
                style={{
                  backgroundColor: "#000",
                  height: "400px",
                  borderRadius: "8px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Online Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  Online
                </span>
              </div>

              {/* Batch Details Section */}
              <h6 style={{ fontWeight: 700, marginBottom: "1rem", marginTop: "1.5rem" }}>
                📋 Batch Details
              </h6>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                    fontSize: "0.95rem",
                  }}
                >
                  <span>Progress: 65%</span>
                  <span>Remaining Time: 00:45</span>
                </div>
                <ProgressBar
                  now={65}
                  style={{ height: "10px", borderRadius: "5px" }}
                />
              </div>

              <hr />

              {/* System Status */}
              <div style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span>Robot Status = </span>
                  <span
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    Offline
                  </span>
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <span>Robot End Effector Position = </span>
                  <strong>
                    X: {liveFeed.position.x} Y: {liveFeed.position.y} Z:{" "}
                    {liveFeed.position.z}
                  </strong>
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <span>Test Chamber Tray Status = </span>
                  <strong>{liveFeed.trayStatus}</strong>
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <span>Temperature (°C) = </span>
                  <strong>{liveFeed.temperature}</strong>
                </div>
              </div>

              {/* Toggle Button */}
              <Button
                variant="primary"
                style={{ marginTop: "1.5rem" }}
                onClick={() => {
                  const s = liveFeed.trayStatus === "In" ? "Out" : "In";
                  setLiveFeed({ ...liveFeed, trayStatus: s });
                }}
              >
                🔄 Toggle Tray Status
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Sample Observation */}
        <Col xs={12} md={5}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              {/* Header */}
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: "1rem" }}>
                  🔬 Sample Observation
                </h6>
                <hr style={{ margin: "0.75rem 0" }} />

                <div style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                  <span>Number of Samples can be prepared : </span>
                  <strong>{samples.length}</strong>
                </div>

                {/* Sample Cards Grid */}
                <Row className="g-2">
                  {samples.map((s) => (
                    <Col xs={6} key={s.id}>
                      <div
                        style={{
                          backgroundColor: "#f9fafb",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          textAlign: "center",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#3f237d",
                            marginBottom: "0.25rem",
                            fontSize: "0.95rem",
                          }}
                        >
                          {s.id}
                        </p>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#666",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Time: {s.breakthroughTime}
                        </p>
                        <p
                          style={{
                            fontWeight: 700,
                            color:
                              s.status === "Passed" ? "#28a745" : "#dc3545",
                            fontSize: "0.85rem",
                            marginBottom: 0,
                          }}
                        >
                          {s.status}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Start Batch Button */}
              <Button
                variant="primary"
                style={{ marginTop: "1.5rem" }}
                onClick={() => navigate("/start-batch")}
              >
                ▶️ Start New Batch
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}