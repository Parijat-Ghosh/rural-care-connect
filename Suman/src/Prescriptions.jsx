import React from "react";
import "./Prescriptions.css";

const prescriptionData = [
  {
    doctor: "Dr. Rajesh Kumar",
    docType: "General Medicine",
    id: "RX001",
    date: "1/15/2024",
    diagnosis: "Common Cold and Fever",
    medicines: 3,
    nextVisit: "1/22/2024",
  },
  {
    doctor: "Dr. Priya Singh",
    docType: "Cardiology",
    id: "RX002",
    date: "1/10/2024",
    diagnosis: "Hypertension",
    medicines: 2,
    nextVisit: "2/8/2024",
  },
  {
    doctor: "Dr. Manpreet Kaur",
    docType: "Pediatrics",
    id: "RX003",
    date: "1/1/2024",
    diagnosis: "Seasonal Allergies",
    medicines: 1,
    nextVisit: null,
  },
];

function Prescriptions() {
  return (
    <div className="prescriptions-root">
      {/* Top App Bar */}
      <header className="app-bar">
        <span className="back-arrow">&larr;</span>
        <span className="page-title">Prescriptions</span>
      </header>

      {/* Summary */}
      <div className="summary-card">
        <div className="summary-title">E-Prescriptions</div>
        <div className="summary-desc">Digital prescriptions from Nabha healthcare providers</div>
        <div className="summary-counts">
          <div className="summary-count">
            <div className="summary-count-value">3</div>
            <div className="summary-count-label">Total</div>
          </div>
          <div className="summary-count">
            <div className="summary-count-value active">2</div>
            <div className="summary-count-label">Active</div>
          </div>
        </div>
      </div>

      {/* Prescription Cards */}
      {prescriptionData.map((item, idx) => (
        <div className="prescription-card" key={item.id}>
          <div className="prescription-header">
            <div>
              <div className="doctor-name">{item.doctor}</div>
              <div className="card-sub">{item.docType}</div>
              <div className="card-date">{item.date}</div>
            </div>
            <div className="rx-id">{item.id}</div>
            <div className="card-icons">
              <span>👁️</span>
              <span>📑</span>
            </div>
          </div>
          <div className="diagnosis-row">
            <span className="label">Diagnosis:</span>
            <span className="value">{item.diagnosis}</span>
          </div>
          <div className="diagnosis-row">
            <span className="label">Medicines:</span>
            <span className="value">{item.medicines} items</span>
          </div>
          <div className="diagnosis-row">
            <span className="label">Next Visit:</span>
            <span className="value next-visit">{item.nextVisit ? item.nextVisit : "--"}</span>
          </div>
          <div className="actions-row">
            <button className="details-btn">View Details</button>
            <button className="icon-action">⬇️</button>
            <button className="icon-action">🔗</button>
          </div>
        </div>
      ))}

      {/* Tips */}
      <div className="tips-card">
        <h4>How to Use E-Prescriptions</h4>
        <ul>
          <li>Show QR code at pharmacy for quick access</li>
          <li>Download PDF for offline access</li>
          <li>Share with family members if needed</li>
          <li>Keep track of medicine schedules</li>
          <li>Follow up on scheduled visits</li>
        </ul>
      </div>
    </div>
  );
}

export default Prescriptions;
