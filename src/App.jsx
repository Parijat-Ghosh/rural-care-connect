<<<<<<< HEAD
import React from 'react';
import HospitalDashboard from './HospitalDashboard';

function App() {
  return <HospitalDashboard />;
=======
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
>>>>>>> 98b4bdd2f0f1adda8cc66137f35caeaab430e2df
}

export default App;
