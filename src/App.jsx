import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";
import BookConsultationApp from "./book_consultationmain/App"; // 👈 booking flow

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard as default route */}
        <Route path="/" element={<PatientDashboard />} />

        {/* Book Consultation flow */}
        <Route path="/book-consultation/*" element={<BookConsultationApp />} />
      </Routes>
    </Router>
  );
}

export default App;
