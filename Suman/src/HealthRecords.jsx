import React, { useState } from "react";
import "./HealthRecords.css";

const members = [
  { id: 1, name: "Rajesh", label: "Self" },
  { id: 2, name: "Priya", label: "Spouse" },
  { id: 3, name: "Arjun", label: "Son" }
];

const recordsData = {
  Rajesh: {
    name: "Rajesh Kumar",
    label: "Self",
    dob: "6/15/1985",
    bloodType: "B+",
    recordId: "HR001",
    allergies: ["Penicillin", "Peanuts"],
    chronic: ["Hypertension"],
    contact: { name: "Priya Kumar", phone: "+91 98765 43210", relation: "Spouse" }
  },
  Priya: {
    name: "Priya Kumar", label: "Spouse", dob: "7/3/1987", bloodType: "O+", recordId: "HR002",
    allergies: [], chronic: [], contact: { name: "Rajesh Kumar", phone: "+91 98765 43211", relation: "Husband" }
  },
  Arjun: {
    name: "Arjun Kumar", label: "Son", dob: "3/12/2010", bloodType: "A+", recordId: "HR003",
    allergies: [], chronic: [], contact: { name: "Rajesh Kumar", phone: "+91 98765 43211", relation: "Father" }
  }
};

export default function HealthRecords() {
  const [selected, setSelected] = useState("Rajesh");

  return (
    <div className="records-root">
      {/* AppBar */}
      <header className="records-appbar">
        <span className="back-arrow">&larr;</span>
        <span className="title">Health Records</span>
        <span className="actions"><span>🔗</span><span>📤</span></span>
      </header>

      {/* Family Switcher */}
      <div className="family-card">
        <div>Family Health Records</div>
        <div className="family-desc">Select family member to view records</div>
        <div className="family-switch">
          {members.map(m => (
            <button
              className={`switch-btn${selected === m.name ? " active" : ""}`}
              key={m.id}
              onClick={() => setSelected(m.name)}>
              👤 {m.name}
              <div className="switch-label">{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Info */}
      <div className="main-info-card">
        <div className="main-row">
          <span className="avatar">👤</span>
          <div>
            <div className="main-name">{recordsData[selected].name}</div>
            <div className="main-label">{recordsData[selected].label}</div>
            <div className="main-dob">DOB: {recordsData[selected].dob}</div>
          </div>
        </div>
        <div className="metrics">
          Blood Type: <b>{recordsData[selected].bloodType}</b>
          <span>Record ID: <b>{recordsData[selected].recordId}</b></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab active">Overview</button>
        <button className="tab">Vitals</button>
        <button className="tab">History</button>
        <button className="tab">Vaccines</button>
      </div>

      {/* Allergies & Conditions */}
      <div className="section-card">
        <h4>Allergies & Conditions</h4>
        <div className="section-label">Allergies:</div>
        {recordsData[selected].allergies.length ? (
          recordsData[selected].allergies.map(a => (
            <span className="pill allergy" key={a}>{a}</span>
          ))
        ) : <span className="empty">None</span>}
        <div className="section-label">Chronic Conditions:</div>
        {recordsData[selected].chronic.length ? (
          recordsData[selected].chronic.map(c => (
            <span className="pill chronic" key={c}>{c}</span>
          ))
        ) : <span className="empty">None</span>}
      </div>

      {/* Emergency Contact */}
      <div className="section-card">
        <h4>Emergency Contact</h4>
        <div>Name: {recordsData[selected].contact.name}</div>
        <div>Phone: {recordsData[selected].contact.phone}</div>
        <div>Relationship: {recordsData[selected].contact.relation}</div>
      </div>

      {/* Action Buttons */}
      <div className="action-row">
        <button className="main-btn">Download Complete Health Record</button>
        <button className="outline-btn">Share with Healthcare Provider</button>
      </div>

      {/* Important Notes */}
      <div className="notes-card">
        <h4>Important Notes</h4>
        <ul>
          <li>Keep health records updated after each visit</li>
          <li>Share records with doctors before appointments</li>
          <li>Maintain emergency contact information</li>
          <li>Track vaccination schedules for family</li>
        </ul>
      </div>
    </div>
  );
}
