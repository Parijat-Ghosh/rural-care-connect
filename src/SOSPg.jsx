import React from "react";
import { useNavigate } from "react-router-dom";
import "./SOSPg.css";

const SOSPg = () => {
  const navigate = useNavigate();

  return (
    <div className="sos-container">
      <div className="sos-card">
        <h1 className="sos-title">🚨 Emergency SOS</h1>
        <p className="sos-subtitle">
          If you are facing a medical emergency, you can immediately call an
          ambulance or alert nearby hospitals.
        </p>

        <div className="sos-actions">
          <button
            className="sos-btn sos-call"
            onClick={() => window.open("tel:108")}
          >
            📞 Call Ambulance (108)
          </button>
          <button
            className="sos-btn sos-alert"
            onClick={() => alert("Nearby hospitals have been notified!")}
          >
            🚑 Alert Nearby Hospitals
          </button>
        </div>

        <button className="back-btn" onClick={() => navigate("/")}>
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SOSPg;
