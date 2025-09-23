// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientDashboard from "./PatientDashboard";
import BookConsultationApp from "./book_consultationmain/App";

// Pages moved into src/Suman_source (use exact filenames)
import UploadReports from "./Suman_source/UploadReports.jsx";
import Prescriptions from "./Suman_source/Prescriptions.jsx";
import HealthRecords from "./Suman_source/HealthRecords.jsx";

// SOS page (you created SOSPg.jsx)
import SOSPg from "./SOSPg.jsx";

/** Small NotFound page so route errors are visible instead of blank screen */
function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Page not found</h2>
      <p>
        The route you requested doesn't exist. Go back to{" "}
        <a href="/" style={{ color: "#4f46e5" }}>
          Dashboard
        </a>
        .
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Dashboard */}
        <Route path="/" element={<PatientDashboard />} />

        {/* Booking flow (nested routes inside the book_consultation app) */}
        <Route path="/book-consultation/*" element={<BookConsultationApp />} />

        {/* Other standalone pages */}
        <Route path="/upload-reports" element={<UploadReports />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/health-records" element={<HealthRecords />} />

        {/* SOS emergency page */}
        <Route path="/sos" element={<SOSPg />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

