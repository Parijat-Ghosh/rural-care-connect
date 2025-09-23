import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css"; // keep your existing CSS file

// Sample data taken from your screenshots / posts
const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Rajesh Kumar",
    specialty: "General Medicine",
    timeText: "Today • 2:30 PM",
    type: "video",
  },
  {
    id: 2,
    doctor: "Dr. Priya Singh",
    specialty: "Cardiology",
    timeText: "Tomorrow • 10:00 AM",
    type: "in-person",
  },
];

const reminders = [
  { id: 1, medicine: "Paracetamol", time: "8:00 AM", status: "taken" },
  { id: 2, medicine: "Vitamin D", time: "2:00 PM", status: "pending" },
  { id: 3, medicine: "Blood Pressure", time: "8:00 PM", status: "pending" },
];

export default function PatientDashboard() {
  const navigate = useNavigate();

  // navigation helpers
  const goTo = (path) => {
    // console.log for debugging while testing
    console.log("Navigating to", path);
    navigate(path);
  };

  // keyboard helper (Enter / Space)
  const handleKeyNav = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTo(path);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
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
              <button
                className="notification-btn"
                title="Notifications"
                onClick={() => console.log("Open notifications")}
                aria-label="Open notifications"
              >
                🔔
              </button>

              <button
                className="language-btn"
                title="Change Language"
                onClick={() => console.log("Change language")}
                aria-label="Change language"
              >
                🌐
              </button>

              <button
                className="menu-btn"
                title="Settings"
                onClick={() => console.log("Open settings")}
                aria-label="Open settings"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Emergency SOS Button */}
        <div className="sos-section">
          <button
            className="sos-button"
            onClick={() => {
              /* hook your SOS flow here */
              console.log("SOS pressed - call ambulance");
              alert("Calling Ambulance... (demo)");
            }}
            aria-label="Call ambulance"
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
          {/* Book Consultation */}
          <div
            className="action-card"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/book-consultation")}
            onKeyDown={(e) => handleKeyNav(e, "/book-consultation")}
            style={{ cursor: "pointer" }}
            aria-label="Book Consultation"
          >
            <div className="action-icon video-icon">📹</div>
            <div className="action-label">Book Consultation</div>
          </div>

          {/* Upload Reports */}
          <div
            className="action-card"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/upload-reports")}
            onKeyDown={(e) => handleKeyNav(e, "/upload-reports")}
            style={{ cursor: "pointer" }}
            aria-label="Upload Reports"
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

          {upcomingAppointments.map((appt) => (
            <div className="appointment-card" key={appt.id}>
              <div className="appointment-info">
                <h3 className="doctor-name">{appt.doctor}</h3>
                <p className="specialty">{appt.specialty}</p>
                <div className="appointment-time">
                  <span className="time-icon">🕐</span>
                  <span className="time-text">{appt.timeText}</span>
                </div>
              </div>

              <div className="appointment-actions">
                <span
                  className={`appointment-type ${
                    appt.type === "video" ? "video-call" : "in-person"
                  }`}
                >
                  {appt.type === "video" ? "Video Call" : "In-person"}
                </span>

                {appt.type === "video" ? (
                  <button
                    className="call-button"
                    title="Join Call"
                    onClick={() => {
                      console.log("Join video call for", appt.id);
                      alert("Joining video call... (demo)");
                    }}
                    aria-label={`Join call with ${appt.doctor}`}
                  >
                    📞
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Medicine Reminders */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">🔔</span>
            <h2 className="section-title">Medicine Reminders</h2>
          </div>

          {reminders.map((r) => (
            <div className="reminder-card" key={r.id}>
              <div className={`reminder-indicator ${r.status === "taken" ? "green" : "orange"}`} />
              <div className="reminder-info">
                <h4 className="medicine-name">{r.medicine}</h4>
                <p className="medicine-time">{r.time}</p>
              </div>
              <div
                className={`reminder-status ${r.status === "taken" ? "taken" : "pending"}`}
                onClick={() => {
                  if (r.status === "pending") {
                    console.log(`Marking ${r.medicine} as taken`);
                    alert(`${r.medicine} marked taken (demo)`);
                  }
                }}
                role={r.status === "pending" ? "button" : undefined}
                tabIndex={r.status === "pending" ? 0 : undefined}
              >
                {r.status === "taken" ? "✓ Taken" : "Mark Taken"}
              </div>
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
            onClick={() => goTo("/ai-doctor")}
            onKeyDown={(e) => handleKeyNav(e, "/ai-doctor")}
            style={{ cursor: "pointer" }}
            aria-label="AI Doctor"
          >
            <div className="service-icon">🤖</div>
            <div className="service-name">AI Doctor</div>
            <div className="service-arrow">→</div>
          </div>

          <div
            className="service-item"
            role="button"
            tabIndex={0}
            onClick={() => goTo("/prescriptions")}
            onKeyDown={(e) => handleKeyNav(e, "/prescriptions")}
            style={{ cursor: "pointer" }}
            aria-label="Prescriptions"
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
            onKeyDown={(e) => handleKeyNav(e, "/health-records")}
            style={{ cursor: "pointer" }}
            aria-label="Health Records"
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
