import React from "react";
import { Link } from 'react-router-dom';
import "./MedicoDashboard.css";

const MedicoDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="clinic-info">
          <span className="clinic-icon">💙</span>
          <div>
            <h1 className="clinic-name">HealthCare Nabha</h1>
            <p className="clinic-location">Serving Nabha, Punjab</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn">🌐</button>
          <button className="icon-btn">🔔</button>
        </div>
      </header>

      {/* SOS Emergency Button */}
      <section className="sos-section">
        <button className="sos-button">
          <span className="warning-icon">⚠</span>
          <div>
            <div className="sos-title">SOS Emergency</div>
            <div className="sos-subtitle">Call Ambulance</div>
          </div>
        </button>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="action-card">
          <div className="action-icon">📹</div>
          <p>Book Consultation</p>
        </div>
        {/* Make Upload Reports card clickable */}
        <Link to="/reports" className="action-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="action-icon">📤</div>
          <p>Upload Reports</p>
        </Link>
      </section>

      {/* Upcoming Appointments */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">📅</span>
          <h2>Upcoming Appointments</h2>
        </div>
        <div className="appointment-card">
          <div className="appointment-info">
            <h3>Dr. Rajesh Kumar</h3>
            <p className="specialty">General Medicine</p>
            <p>
              <small>Today • 2:30 PM</small>{" "}
              <span className="appointment-type video-call">Video Call</span>
            </p>
          </div>
          <button className="call-btn">📞</button>
        </div>
        <div className="appointment-card">
          <div className="appointment-info">
            <h3>Dr. Priya Singh</h3>
            <p className="specialty">Cardiology</p>
            <p>
              <small>Tomorrow • 10:00 AM</small>{" "}
              <span className="appointment-type in-person">In-person</span>
            </p>
          </div>
        </div>
      </section>

      {/* Medicine Reminders */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🔔</span>
          <h2>Medicine Reminders</h2>
        </div>
        <div className="reminder-card">
          <span className="reminder-indicator green"></span>
          <div>
            <p className="medicine-name">Paracetamol</p>
            <small>8:00 AM</small>
          </div>
          <p className="reminder-status taken">✓ Taken</p>
        </div>
        <div className="reminder-card">
          <span className="reminder-indicator orange"></span>
          <div>
            <p className="medicine-name">Vitamin D</p>
            <small>2:00 PM</small>
          </div>
          <button className="reminder-status pending">Mark Taken</button>
        </div>
        <div className="reminder-card">
          <span className="reminder-indicator orange"></span>
          <div>
            <p className="medicine-name">Blood Pressure</p>
            <small>8:00 PM</small>
          </div>
          <button className="reminder-status pending">Mark Taken</button>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section additional-services">
        <h2>Additional Services</h2>
        <div className="service-item">
          <span>🤖</span>
          <p>AI Doctor</p>
          <span className="arrow">→</span>
        </div>
        <Link to="/prescriptions" className="service-item" style={{ textDecoration: "none", color: "inherit" }}>
          <span>💊</span>
          <p>Prescriptions</p>
          <span className="arrow">→</span>
        </Link>
        <Link to="/healthrecords" className="service-item" style={{ textDecoration: "none", color: "inherit" }}>
          <span>📋</span>
          <p>Health Records</p>
          <span className="arrow">→</span>
        </Link>
      </section>
    </div>
  );
};

export default MedicoDashboard;
