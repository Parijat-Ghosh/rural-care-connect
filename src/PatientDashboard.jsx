import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";
import ChatBot from "./Components/ChatBot"; // keep your working chatbot

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([
    { id: 1, name: "Paracetamol", time: "8:00 AM", status: "taken" },
    { id: 2, name: "Vitamin D", time: "2:00 PM", status: "pending" },
    { id: 3, name: "Blood Pressure", time: "8:00 PM", status: "pending" },
  ]);
  const [chatOpen, setChatOpen] = useState(false);

  const markTaken = (id) => {
    setReminders((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "taken" } : m))
    );
  };

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* --- Header --- */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="clinic-info">
              <div className="clinic-icon">
                <span role="img" aria-label="heart" className="heart-icon">
                  💙
                </span>
              </div>
              <div className="clinic-details">
                <h1 className="clinic-name">HealthCare Nabha</h1>
                <p className="clinic-location">Serving Nabha, Punjab</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="notification-btn">🔔</button>
              <button className="language-btn">🌐</button>
              <button className="menu-btn">⚙️</button>
            </div>
          </div>
        </div>

        {/* --- SOS Emergency --- */}
        <div className="sos-section">
          <button
            className="sos-button"
            onClick={() => goTo("/sos")}
            type="button"
          >
            <span className="warning-icon">⚠️</span>
            <div className="sos-text">
              <div className="sos-title">SOS Emergency</div>
              <div className="sos-subtitle">Call Ambulance</div>
            </div>
          </button>
        </div>

        {/* --- Quick Actions --- */}
        <div className="quick-actions">
          <div
            className="action-card"
            onClick={() => goTo("/book-consultation")}
          >
            <div className="action-icon">📹</div>
            <div className="action-label">Book Consultation</div>
          </div>
          <div
            className="action-card"
            onClick={() => goTo("/upload-reports")}
          >
            <div className="action-icon">📤</div>
            <div className="action-label">Upload Reports</div>
          </div>
        </div>

        {/* --- Appointments --- */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">📅</span>
            <h2 className="section-title">Upcoming Appointments</h2>
          </div>
          <div className="appointment-card">
            <div className="appointment-info">
              <h3 className="doctor-name">Dr. Rajesh Kumar</h3>
              <p className="specialty">General Medicine</p>
              <div className="appointment-time">
                <span className="time-text">Today • 2:30 PM</span>
              </div>
            </div>
            <div className="appointment-actions">
              <span className="appointment-type video-call">Video Call</span>
              <button className="call-button">📞</button>
            </div>
          </div>
        </div>

        {/* --- Medicine Reminders --- */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">🔔</span>
            <h2 className="section-title">Medicine Reminders</h2>
          </div>
          {reminders.map((med) => (
            <div key={med.id} className="reminder-card">
              <div
                className={`reminder-indicator ${
                  med.status === "taken" ? "green" : "orange"
                }`}
              />
              <div className="reminder-info">
                <h4 className="medicine-name">{med.name}</h4>
                <p className="medicine-time">{med.time}</p>
              </div>
              {med.status === "taken" ? (
                <div className="reminder-status taken">✓ Taken</div>
              ) : (
                <button
                  className="reminder-status pending"
                  onClick={() => markTaken(med.id)}
                >
                  Mark Taken
                </button>
              )}
            </div>
          ))}
        </div>

        {/* --- Additional Services --- */}
        <div className="section">
          <h2 className="section-title">Additional Services</h2>
          <div className="service-item" onClick={() => goTo("/prescriptions")}>
            <div className="service-icon">💊</div>
            <div className="service-name">Prescriptions</div>
            <div className="service-arrow">→</div>
          </div>
          <div
            className="service-item"
            onClick={() => goTo("/health-records")}
          >
            <div className="service-icon">📋</div>
            <div className="service-name">Health Records</div>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </div>

      {/* --- Fullscreen AI Chat overlay --- */}
      {!chatOpen && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setChatOpen(true)}
            style={{
              background: "linear-gradient(135deg,#6d28d9,#06b6d4)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
          >
            💬 AI Chat
          </button>
        </div>
      )}

      {chatOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.98)",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              textAlign: "right",
              borderBottom: "1px solid #ddd",
            }}
          >
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
}
