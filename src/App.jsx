import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientDashboard from "./PatientDashboard";             // dashboard
import BookConsultationApp from "./book_consultationmain/App"; // booking flow
import UploadReports from "./Suman_source/UploadReports";      // upload reports
import Prescriptions from "./Suman_source/Prescriptions";      // prescriptions
import HealthRecords from "./Suman_source/HealthRecords";      // health records

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard default */}
        <Route path="/" element={<PatientDashboard />} />

        {/* Booking flow */}
        <Route path="/book-consultation/*" element={<BookConsultationApp />} />

        {/* Other sections */}
        <Route path="/upload-reports" element={<UploadReports />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/health-records" element={<HealthRecords />} />
      </Routes>
    </Router>
  );
}

export default App;
