import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBackendData = () => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:5050/data")
      .catch(() => fetch("http://127.0.0.1:5050/data"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to connect to backend");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  return (
    <BoardProvider>
      <ToolboxProvider>
        {/* Backend API Data Display Widget */}
        <div
          style={{
            position: "fixed",
            top: 14,
            left: 14,
            zIndex: 100,
            backgroundColor: "#ffffff",
            padding: "12px 16px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
            border: "1px solid #e2e8f0",
            fontFamily: "system-ui, -apple-system, sans-serif",
            maxWidth: "340px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>
              HTTP API RESPONSE
            </span>
            <button
              onClick={fetchBackendData}
              disabled={loading}
              style={{
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              {loading ? "Fetching..." : "Refresh"}
            </button>
          </div>

          {loading && !data && (
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Loading data from server...</p>
          )}

          {error && (
            <div style={{ color: "#ef4444", fontSize: "12px" }}>
              ⚠️ {error} <br />
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                (Make sure <code>npm run server</code> is running)
              </span>
            </div>
          )}

          {data && (
            <div style={{ fontSize: "13px", color: "#1e293b" }}>
              <div>
                <strong>Message: </strong>
                <span style={{ color: "#16a34a", fontWeight: "600" }}>{data.message}</span>
              </div>
              <div style={{ marginTop: "4px", fontSize: "12px", color: "#64748b" }}>
                <span>Server Time: {data.timestamp}</span>
              </div>
            </div>
          )}
        </div>

        <Toolbar />
        <Board />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;
