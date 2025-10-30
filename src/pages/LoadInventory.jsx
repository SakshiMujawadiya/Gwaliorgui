import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const imageMap = {
  "SS Base": "/images/ss_base.jpg",
  "SS Innerflange": "/images/ss_innerflange.jpg",
  "SS Outerflange": "/images/ss_outerflange.jpg",
  "Chemical Reagent": "/images/chemical_reagent.jpg",
  "Toxic Chemical": "/images/toxic_chemical.jpg",
  "NBC Sample": "/images/nbc_sample.jpg",
  "Congored Paper": "/images/congored_paper.jpg",
  "Cotton Drill": "/images/cotton_drill.jpg",
  "Cartridge": "/images/cartridge.jpg",
};

const defaultInventory = [
  {
    id: 1,
    name: "SS Base",
    description:
      "Stainless steel base component used as a foundational structure in chemical assembly or containment setups.",
    quantity: 15,
  },
  {
    id: 2,
    name: "SS Innerflange",
    description:
      "Interconnecting stainless steel flange ensuring secure sealing between pipeline sections.",
    quantity: 2,
  },
  {
    id: 3,
    name: "SS Outerflange",
    description:
      "Outer mounting flange for external pipe support, ideal for high-pressure industrial systems.",
    quantity: 21,
  },
  {
    id: 4,
    name: "Chemical Reagent",
    description:
      "A standardized solution used for chemical reactions, tests, and experiments in lab analysis.",
    quantity: 20,
  },
  {
    id: 5,
    name: "Toxic Chemical",
    description:
      "Hazardous chemical compound requiring controlled handling and PPE; used in simulation of threat scenarios.",
    quantity: 30,
  },
  {
    id: 6,
    name: "NBC Sample",
    description:
      "Simulated Nuclear, Biological, and Chemical test sample for training or detection system calibration.",
    quantity: 21,
  },
  {
    id: 7,
    name: "Congored Paper",
    description:
      "Indicator paper used to detect acid or base presence through color change when exposed to chemicals.",
    quantity: 30,
  },
  {
    id: 8,
    name: "Cotton Drill",
    description:
      "Durable cotton fabric used in protective lab clothing or test environment lining.",
    quantity: 15,
  },
  {
    id: 9,
    name: "Cartridge",
    description:
      "Disposable cartridge for loading chemicals or air filtration in hazardous environment gear.",
    quantity: 10,
  },
];

export default function LoadInventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/inventory");
        if (res.ok) {
          const data = await res.json();
          setItems(data);
          localStorage.setItem("inventory", JSON.stringify(data));
        } else {
          const saved = JSON.parse(localStorage.getItem("inventory"));
          setItems(saved || defaultInventory);
        }
      } catch {
        const saved = JSON.parse(localStorage.getItem("inventory"));
        setItems(saved || defaultInventory);
      }
    };
    fetchInventory();
  }, []);

  const saveInventory = (updated) => {
    setItems(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
  };

  const updateQuantity = (index, change) => {
    const updated = [...items];
    updated[index].quantity = Math.max(0, updated[index].quantity + change);
    updated[index].lastUpdated = new Date().toLocaleString();
    saveInventory(updated);
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container>
        <h3 style={{ fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#1e293b" }}>
          🧪 Inventory Overview
        </h3>

        <Row className="g-3">
          {items.map((item, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                className="h-100 shadow-sm"
                style={{
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Image */}
                <Card.Img
                  variant="top"
                  src={imageMap[item.name] || "/images/default.jpg"}
                  onError={(e) => (e.target.src = "/images/default.jpg")}
                  style={{
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />

                {/* Card Body */}
                <Card.Body className="d-flex flex-column justify-content-between">
                  {/* Title */}
                  <h6
                    style={{
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#0f172a",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.name}
                  </h6>

                  {/* Description */}
                  <p
                    style={{
                      textAlign: "center",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "1rem",
                      minHeight: "60px",
                    }}
                  >
                    {item.description}
                  </p>

                  <hr />

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => updateQuantity(index, -1)}
                      title="Decrease"
                      style={{
                        width: "36px",
                        height: "36px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      −
                    </Button>

                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        minWidth: "40px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => updateQuantity(index, +1)}
                      title="Increase"
                      style={{
                        width: "36px",
                        height: "36px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </Button>
                  </div>

                  {/* Last Updated */}
                  {item.lastUpdated && (
                    <small
                      style={{
                        textAlign: "center",
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                      }}
                    >
                      Last Updated: {item.lastUpdated}
                    </small>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}