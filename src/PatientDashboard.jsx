import React from 'react';
import './PatientDashboard.css';
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    navigate("/book-consultation");
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

        {/* Emergency SOS Button */}
        <div className="sos-section">
          <button className="sos-button">
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
  onClick={() => { console.log("Book Consultation clicked"); navigate("/book-consultation"); }}
  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { console.log("Book Consultation (key)"); navigate("/book-consultation"); } }}
  style={{ cursor: "pointer" }}
>
  <div className="action-icon video-icon">📹</div>
  <div className="action-label">Book Consultation</div>
</div>
          <div className="action-card">
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
              <button className="call-button" title="Join Call">📞</button>
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
          <div className="reminder-card">
            <div className="reminder-indicator green"></div>
            <div className="reminder-info">
              <h4 className="medicine-name">Paracetamol</h4>
              <p className="medicine-time">8:00 AM</p>
            </div>
            <div className="reminder-status taken">✓ Taken</div>
          </div>
          <div className="reminder-card">
            <div className="reminder-indicator orange"></div>
            <div className="reminder-info">
              <h4 className="medicine-name">Vitamin D</h4>
              <p className="medicine-time">2:00 PM</p>
            </div>
            <div className="reminder-status pending">Mark Taken</div>
          </div>
          <div className="reminder-card">
            <div className="reminder-indicator orange"></div>
            <div className="reminder-info">
              <h4 className="medicine-name">Blood Pressure</h4>
              <p className="medicine-time">8:00 PM</p>
            </div>
            <div className="reminder-status pending">Mark Taken</div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="section">
          <h2 className="section-title">Additional Services</h2>
          <div className="service-item">
            <div className="service-icon">🤖</div>
            <div className="service-name">AI Doctor</div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-item">
            <div className="service-icon">💊</div>
            <div className="service-name">Prescriptions</div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-item">
            <div className="service-icon">📋</div>
            <div className="service-name">Health Records</div>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
