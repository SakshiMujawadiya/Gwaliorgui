import React, { useEffect, useState, useRef, useCallback } from "react";

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
  { id: 1, name: "SS Base", description: "Stainless steel base component used as foundation.", quantity: 15 },
  { id: 2, name: "SS Innerflange", description: "Interconnecting flange ensuring secure sealing.", quantity: 2 },
  { id: 3, name: "SS Outerflange", description: "Outer mounting flange for support.", quantity: 21 },
  { id: 4, name: "Chemical Reagent", description: "Solution used for reactions.", quantity: 20 },
  { id: 5, name: "Toxic Chemical", description: "Hazardous compound requiring PPE.", quantity: 30 },
  { id: 6, name: "NBC Sample", description: "Simulated test sample for calibration.", quantity: 21 },
  { id: 7, name: "Congored Paper", description: "Indicator paper for acid/base detection.", quantity: 30 },
  { id: 8, name: "Cotton Drill", description: "Durable fabric used in lab clothing.", quantity: 15 },
  { id: 9, name: "Cartridge", description: "Disposable chemical cartridge.", quantity: 10 },
];

const InventoryCard = ({ item, index, onQuantityChange }) => {
  const [isDecreasing, setIsDecreasing] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const holdIntervalRef = useRef(null);

  const handleMouseEnter = useCallback((change) => {
    onQuantityChange(index, change);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    
    holdIntervalRef.current = setInterval(() => {
      onQuantityChange(index, change);
    }, 150);

    if (change === -1) setIsDecreasing(true);
    if (change === 1) setIsIncreasing(true);
  }, [index, onQuantityChange]);

  const handleMouseLeave = useCallback((change) => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setIsDecreasing(false);
    setIsIncreasing(false);
  }, []);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <div
      style={{
        borderRadius: "14px",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div
        style={{
          width: "100%",
          height: "150px",
          backgroundColor: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
        }}
      >
        {item.name === "SS Base" && "⚙️"}
        {item.name === "SS Innerflange" && "🔧"}
        {item.name === "SS Outerflange" && "⚡"}
        {item.name === "Chemical Reagent" && "🧪"}
        {item.name === "Toxic Chemical" && "☠️"}
        {item.name === "NBC Sample" && "🧬"}
        {item.name === "Congored Paper" && "📄"}
        {item.name === "Cotton Drill" && "🧵"}
        {item.name === "Cartridge" && "🔫"}
      </div>
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h6 style={{ fontWeight: 600, color: "#1e293b", margin: "0 0 0.5rem 0" }}>
          {item.name}
        </h6>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", minHeight: "60px", margin: "0.5rem 0" }}>
          {item.description}
        </p>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
          <button
            title="Hover to Decrease"
            onMouseEnter={() => handleMouseEnter(-1)}
            onMouseLeave={() => handleMouseLeave(-1)}
            style={{
              padding: "0.375rem 0.75rem",
              fontSize: "0.875rem",
              border: "1px solid #dc2626",
              color: isDecreasing ? "white" : "#dc2626",
              backgroundColor: isDecreasing ? "#dc2626" : "transparent",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.15s ease",
            }}
          >
            −
          </button>

          <span style={{ fontWeight: 700, fontSize: "1.1rem", minWidth: "40px", textAlign: "center" }}>
            {item.quantity}
          </span>

          <button
            title="Hover to Increase"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
            style={{
              padding: "0.375rem 0.75rem",
              fontSize: "0.875rem",
              border: "1px solid #16a34a",
              color: isIncreasing ? "white" : "#16a34a",
              backgroundColor: isIncreasing ? "#16a34a" : "transparent",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.15s ease",
            }}
          >
            +
          </button>
        </div>

        {item.lastUpdated && (
          <small style={{ color: "#9ca3af", display: "block", marginTop: "0.5rem" }}>
            Last Updated: {item.lastUpdated}
          </small>
        )}
      </div>
    </div>
  );
};

export default function LoadInventory() {
  const [items, setItems] = useState(defaultInventory);
  const [status, setStatus] = useState({ message: "", variant: "success" });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [possibleSamples, setPossibleSamples] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      const low = items.filter((i) => i.quantity < 5);
      if (low.length > 0) {
        setStatus({
          message: `⚠️ Low Inventory — Cannot prepare samples. Low items: ${low
            .map((i) => i.name)
            .join(", ")}`,
          variant: "warning",
        });
      } else {
        setStatus({
          message: "✅ All inventory sufficient — sample preparation possible.",
          variant: "success",
        });
      }

      setPossibleSamples(Math.min(...items.map((i) => i.quantity)));
    }
  }, [items]);

  const updateQuantity = useCallback((index, change) => {
    setItems((prevItems) => {
      const updated = [...prevItems];
      const newQty = updated[index].quantity + change;

      if (newQty < 0) {
        updated[index].quantity = 0;
      } else if (newQty > 300) {
        updated[index].quantity = 300;
      } else {
        updated[index].quantity = newQty;
      }

      updated[index].lastUpdated = new Date().toLocaleString();
      return updated;
    });
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
      setUploadedFile(file);
    } else {
      alert("Please upload only PDF or Word (.doc/.docx) files.");
      e.target.value = "";
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <h3 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "1.2rem", color: "#0f172a" }}>
          🧪 Inventory Overview
        </h3>

        <div style={{ background: "#ffffff", borderRadius: "12px", boxShadow: "0 3px 10px rgba(0,0,0,0.1)", padding: "1rem 1.5rem", marginBottom: "1.5rem" }}>
          {status.message && (
            <div style={{
              textAlign: "center",
              borderRadius: "8px",
              fontWeight: 500,
              marginBottom: "1rem",
              padding: "0.75rem",
              backgroundColor: status.variant === "warning" ? "#fef08a" : "#dcfce7",
              color: status.variant === "warning" ? "#92400e" : "#166534",
              border: `1px solid ${status.variant === "warning" ? "#fde047" : "#86efac"}`,
            }}>
              {status.message}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <label style={{ fontWeight: 600, marginRight: "10px" }}>📁 Upload Report:</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
              {uploadedFile && <small style={{ color: "#2563eb", fontWeight: 500, marginLeft: "5px" }}>✅ {uploadedFile.name}</small>}
            </div>

            <div style={{ background: "linear-gradient(135deg, #2563eb, #1e40af)", color: "white", borderRadius: "10px", padding: "8px 16px", boxShadow: "0 3px 8px rgba(0,0,0,0.15)", fontWeight: 600, fontSize: "0.95rem" }}>
              🧮 Possible Samples: <span style={{ display: "inline-block", backgroundColor: "white", color: "#1e40af", padding: "2px 8px", borderRadius: "4px", marginLeft: "6px", fontSize: "0.9rem", fontWeight: 700 }}>{possibleSamples}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {items.map((item, index) => (
            <InventoryCard key={item.id} item={item} index={index} onQuantityChange={updateQuantity} />
          ))}
        </div>
      </div>
    </div>
  );
}