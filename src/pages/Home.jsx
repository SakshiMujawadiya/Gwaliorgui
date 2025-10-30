// Home.jsx
import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutIcon from "@mui/icons-material/Logout";

import LoadInventory from "./LoadInventory";
import PrepareSamples from "./PrepareSamples";
import MonitorSamples from "./MonitorSamples";
import DisposeSamples from "./DisposeSamples";
import ProcessPage from "./ProcessPage";

const pages = [
  { key: "load", text: "Load Inventory", icon: "📦" },
  { key: "prepare", text: "Prepare Samples", icon: "🧪" },
  { key: "monitor", text: "Monitor Samples", icon: "📊" },
  { key: "dispose", text: "Dispose Samples", icon: "🗑️" },
  { key: "process", text: "Process Samples", icon: "⚙️" },
];

export default function Home() {
  const [active, setActive] = useState("monitor");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  const activePageObj = pages.find((x) => x.key === active);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          backgroundColor: "#fff",
          borderBottom: "2px solid #d0d0d0",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <img
            src="/logo1.png"
            alt="logo1"
            style={{ width: 48, height: 48 }}
          />
          <img
            src="/logo2.png"
            alt="logo2"
            style={{ width: 48, height: 48 }}
          />
        </div>

        <h3
          style={{
            fontWeight: 700,
            color: "#333",
            margin: 0,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          SAMPLE MONITORING SYSTEM
        </h3>

        <Button
          variant="outline-secondary"
          onClick={handleLogout}
          className="d-flex align-items-center gap-2"
          style={{
            borderRadius: "6px",
            fontSize: "0.9rem",
          }}
        >
          <LogoutIcon style={{ fontSize: "1.2rem" }} />
          <span className="d-none d-sm-inline">Logout</span>
        </Button>
      </div>

      {/* Navigation Bar (moves to top on small screens) */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
          padding: "0.75rem 1rem",
          display: "none",
        }}
        className="d-md-none"
      >
        <div className="d-flex gap-2 overflow-auto" style={{ overflowX: "auto" }}>
          {pages.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              style={{
                cursor: "pointer",
                fontWeight: active === p.key ? 600 : 500,
                color: active === p.key ? "#fff" : "#333",
                backgroundColor:
                  active === p.key ? "#3f237d" : "transparent",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                textDecoration: "none",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                fontSize: "0.85rem",
              }}
              onMouseEnter={(e) => {
                if (active !== p.key) {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== p.key) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span>{p.icon}</span>
              <span className="d-none d-sm-inline">{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: "calc(100vh - 100px)",
        }}
      >
        {/* Left Sidebar (Desktop only) */}
        <div
          style={{
            width: "250px",
            backgroundColor: "#f9f9f9",
            borderRight: "1px solid #e0e0e0",
            padding: "1.5rem 0",
            overflowY: "auto",
            display: "none",
          }}
          className="d-none d-md-block"
        >
          <div className="px-3 d-flex flex-column gap-2">
            {pages.map((p) => (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                style={{
                  cursor: "pointer",
                  fontWeight: active === p.key ? 600 : 500,
                  color: active === p.key ? "#fff" : "#333",
                  backgroundColor:
                    active === p.key ? "#3f237d" : "transparent",
                  padding: "0.75rem 1rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (active !== p.key) {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== p.key) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span>{p.icon}</span>
                {p.text}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "#fff",
            overflowY: "auto",
          }}
        >
          <h5
            style={{
              marginBottom: "1.5rem",
              fontWeight: 700,
              color: "#3f237d",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span>{activePageObj?.icon}</span>
            {activePageObj?.text}
          </h5>

          {/* Content Sections */}
          {active === "load" && <LoadInventory />}
          {active === "prepare" && <PrepareSamples />}
          {active === "monitor" && <MonitorSamples />}
          {active === "dispose" && <DisposeSamples />}
          {active === "process" && <ProcessPage />}
        </div>
      </div>
    </div>
  );
}