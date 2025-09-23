import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthRecords.css";

const familyMembers = [
  {
    id: "self",
    label: "Rajesh\nSelf",
    name: "Rajesh Kumar",
    role: "Self",
    dob: "6/15/1985",
    blood: "B+",
    record: "HR001",
    allergies: ["Penicillin", "Peanuts"],
    chronic: ["Hypertension"],
    emergency: {
      name: "Priya Kumar",
      phone: "+91 98765 43210",
      relation: "Spouse",
    },
    vitals: {
      date: "1/15/2024",
      pressure: "130/85 mmHg",
      heartrate: "72 bpm",
      weight: "75 kg",
      height: `5'8"`,
    },
    history: [
      {
        title: "Hypertension",
        date: "1/15/2024",
        doctor: "Dr. Priya Singh",
        notes: "Medication prescribed",
      },
      {
        title: "Common Cold",
        date: "12/20/2023",
        doctor: "Dr. Rajesh Kumar",
        notes: "Antibiotics and rest",
      },
    ],
    vaccines: [
      {
        title: "COVID-19 Booster",
        given: "11/15/2023",
        nextDue: "11/15/2024",
        overdue: true,
      },
      {
        title: "Flu Shot",
        given: "10/1/2023",
        nextDue: "10/1/2024",
        overdue: true,
      },
    ],
  },
  // Add more family members here as needed
];

const TABS = ["Overview", "Vitals", "History", "Vaccines"];

export default function HealthRecords() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("self");
  const [tab, setTab] = useState("Overview");
  const person = familyMembers.find((x) => x.id === selected);

  return (
    <div className="records-root">
      <div className="records-header">
        <button
          className="icon-btn"
          aria-label="Back"
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <span>Health Records</span>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Share">
            🔗
          </button>
          <button className="icon-btn" aria-label="More">
            ⋮
          </button>
        </div>
      </div>

      <div className="card family-card">
        <div
          className="section-label"
          style={{ display: "flex", alignItems: "center", gap: 7 }}
        >
          <span
            style={{ color: "#2950aa", fontSize: 19, display: "flex" }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path
                d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Family Health Records
        </div>
        <div className="mini" style={{ marginLeft: 24 }}>
          Select family member to view records
        </div>
        <div className="members-row">
          {familyMembers.map((f) => (
            <button
              className={`member-btn${selected === f.id ? " active" : ""}`}
              key={f.id}
              onClick={() => {
                setSelected(f.id);
                setTab("Overview");
              }}
            >
              <span className="member-icon" aria-hidden="true">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="4" fill="currentColor" />
                  <path
                    d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="member-name">{f.name.split(" ")[0]}</div>
              <div className="member-meta">{f.role}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card profile-card">
        <div className="profile-row">
          <span className="avatar">{person.name.charAt(0)}</span>
          <div>
            <div className="profile-name">{person.name}</div>
            <div className="profile-role">{person.role}</div>
            <div className="mini">DOB: {person.dob}</div>
          </div>
        </div>
        <div className="profile-id-row">
          <span>
            <b>Blood Type:</b> {person.blood}
          </span>
          <span style={{ flex: 1 }}></span>
          <span>
            <b>Record ID:</b> {person.record}
          </span>
        </div>
      </div>

      <div className="tabs-row">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab-btn${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <div className="card">
            <div className="section-title">Allergies & Conditions</div>
            <div className="line-head">Allergies:</div>
            <div>
              {person.allergies.length ? (
                person.allergies.map((a) => (
                  <span className="pill allergy" key={a}>
                    {a}
                  </span>
                ))
              ) : (
                <span className="mini">None</span>
              )}
            </div>
            <div className="line-head" style={{ marginTop: 8 }}>
              Chronic Conditions:
            </div>
            <div>
              {person.chronic.length ? (
                person.chronic.map((c) => (
                  <span className="pill chronic" key={c}>
                    {c}
                  </span>
                ))
              ) : (
                <span className="mini">None</span>
              )}
            </div>
          </div>
          <div className="card">
            <div className="section-title">Emergency Contact</div>
            <table className="em-table">
              <tbody>
                <tr>
                  <td className="mini">
                    <b>Name:</b>
                  </td>
                  <td className="mini" style={{ textAlign: "right" }}>
                    {person.emergency.name}
                  </td>
                </tr>
                <tr>
                  <td className="mini">
                    <b>Phone:</b>
                  </td>
                  <td className="mini" style={{ textAlign: "right" }}>
                    {person.emergency.phone}
                  </td>
                </tr>
                <tr>
                  <td className="mini">
                    <b>Relationship:</b>
                  </td>
                  <td className="mini" style={{ textAlign: "right" }}>
                    {person.emergency.relation}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "Vitals" && (
        <div className="card">
          <div
            className="section-title"
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <span style={{ color: "#c43d3d" }}>{"\u23F0"}</span>
            Current Vitals
          </div>
          <div className="mini" style={{ marginBottom: 19 }}>
            Last updated: {person.vitals.date}
          </div>
          <div className="vitals-row">
            <div className="vital-box pressure">
              <div className="vital-icon">❤️</div>
              <div className="vital-label">Blood Pressure</div>
              <div className="vital-value">{person.vitals.pressure}</div>
            </div>
            <div className="vital-box pulse">
              <div className="vital-icon" style={{ color: "#3c77e8" }}>
                📈
              </div>
              <div className="vital-label">Heart Rate</div>
              <div className="vital-value">{person.vitals.heartrate}</div>
            </div>
            <div className="vital-box weight">
              <div className="vital-icon" style={{ color: "#38ad74" }}>🌿</div>
              <div className="vital-label">Weight</div>
              <div className="vital-value">{person.vitals.weight}</div>
            </div>
            <div className="vital-box height">
              <div className="vital-icon" style={{ color: "#c39fec" }}>📏</div>
              <div className="vital-label">Height</div>
              <div className="vital-value">{person.vitals.height}</div>
            </div>
          </div>
        </div>
      )}

      {tab === "History" && (
        <div className="card">
          <div
            className="section-title"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ color: "#398944" }}>{"💚"}</span> Medical History
          </div>
          {person.history.map((entry) => (
            <div className="history-item" key={entry.title + entry.date}>
              <div className="history-title">{entry.title}</div>
              <div className="mini">{entry.date}</div>
              <div className="mini">
                Doctor: {entry.doctor}
                <br />
                {entry.notes}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Vaccines" && (
        <div className="card">
          <div className="section-title">Vaccination Record</div>
          {person.vaccines.map((v) => (
            <div className="vaccine-row" key={v.title}>
              <div>
                <div className="vaccine-title">{v.title}</div>
                <div className="mini">Given: {v.given}</div>
                <div className="mini">
                  Next due:{" "}
                  <span style={{ color: v.overdue ? "#ed3c65" : "#3c77e8" }}>
                    {v.nextDue}
                  </span>
                </div>
              </div>
              {v.overdue && <span className="vaccine-overdue">Overdue</span>}
            </div>
          ))}
        </div>
      )}

      <div className="card btn-card">
        <button className="main-btn">Download Complete Health Record</button>
        <button className="outline-btn">Share with Healthcare Provider</button>
      </div>
      <div className="card notes-card">
        <div className="notes-title">Important Notes</div>
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