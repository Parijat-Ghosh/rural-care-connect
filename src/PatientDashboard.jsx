import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

export default function PatientDashboard() {
  const navigate = useNavigate();

  // sample data
  const [reminders, setReminders] = useState([
    { id: 1, name: "Paracetamol", time: "8:00 AM", status: "taken" },
    { id: 2, name: "Vitamin D", time: "2:00 PM", status: "pending" },
    { id: 3, name: "Blood Pressure", time: "8:00 PM", status: "pending" },
  ]);

  const markTaken = (id) => {
    setReminders((prev) => prev.map(m => (m.id === id ? { ...m, status: "taken" } : m)));
  };

  // navigation helpers
  const goTo = (path) => {
    console.log("navigate ->", path);
    navigate(path);
  };

  // specifically for SOS with extra debug
  const handleSOS = (e) => {
    e?.preventDefault?.();
    console.log("SOS button clicked");
    goTo("/sos");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="clinic-info">
              <div className="clinic-icon">
                <span role="img" aria-label="heart" className="heart-icon">💙</span>
              </div>
              <div className="clinic-details">
                <h1 className="clinic-name">HealthCare Nabha</h1>
                <p className="clinic-location">Serving Nabha, Punjab</p>
              </div>
            </div>

            <div className="header-actions">
              <button className="notification-btn" title="Notifications">🔔</button>
              <button className="language-btn" title="Change Language">🌐</button>
              <button className="menu-btn" title="Settings">⚙️</button>
            </div>
          </div>
        </div>

        {/* SOS Emergency Button */}
        <div className="sos-section">
          {/* NOTE: this is a plain button that calls handleSOS */}
          <button
            className="sos-button"
            onClick={handleSOS}
            aria-label="Call ambulance - go to SOS page"
            type="button"
            style={{ cursor: "pointer" }}
          >
            <span className="warning-icon">⚠️</span>
            <div className="sos-text">
              <div className="sos-title">SOS Emergency</div>
              <div className="sos-subtitle">Call Ambulance</div>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div
            className="action-card"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/book-consultation")}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goTo("/book-consultation")}
            style={{ cursor: "pointer" }}
          >
            <div className="action-icon video-icon">📹</div>
            <div className="action-label">Book Consultation</div>
          </div>

          <div
            className="action-card"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/upload-reports")}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goTo("/upload-reports")}
            style={{ cursor: "pointer" }}
          >
            <div className="action-icon upload-icon">📤</div>
            <div className="action-label">Upload Reports</div>
          </div>
        </div>

        {/* Upcoming Appointments */}
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
                <span className="time-icon">🕐</span>
                <span className="time-text">Today • 2:30 PM</span>
              </div>
            </div>
            <div className="appointment-actions">
              <span className="appointment-type video-call">Video Call</span>
              <button className="call-button" title="Join Call" type="button">📞</button>
            </div>
          </div>

          <div className="appointment-card">
            <div className="appointment-info">
              <h3 className="doctor-name">Dr. Priya Singh</h3>
              <p className="specialty">Cardiology</p>
              <div className="appointment-time">
                <span className="time-icon">🕐</span>
                <span className="time-text">Tomorrow • 10:00 AM</span>
              </div>
            </div>
            <div className="appointment-actions">
              <span className="appointment-type in-person">In-person</span>
            </div>
          </div>
        </div>

        {/* Medicine Reminders */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">🔔</span>
            <h2 className="section-title">Medicine Reminders</h2>
          </div>

          {reminders.map((med) => (
            <div key={med.id} className="reminder-card">
              <div className={`reminder-indicator ${med.status === "taken" ? "green" : "orange"}`} />
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
                  type="button"
                >
                  Mark Taken
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="section">
          <h2 className="section-title">Additional Services</h2>

          <div
            className="service-item"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/prescriptions")}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goTo("/prescriptions")}
            style={{ cursor: "pointer" }}
          >
            <div className="service-icon">💊</div>
            <div className="service-name">Prescriptions</div>
            <div className="service-arrow">→</div>
          </div>

          <div
            className="service-item"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/health-records")}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goTo("/health-records")}
            style={{ cursor: "pointer" }}
          >
            <div className="service-icon">📋</div>
            <div className="service-name">Health Records</div>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}
