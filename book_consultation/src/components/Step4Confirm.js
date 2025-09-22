import React from "react";

export default function Step4Confirm({ prevStep, formData }) {
  const handleConfirm = () => {
    alert("Consultation booked successfully!");
  };

  return (
    <div>
      <h3>Confirm Booking</h3>
      <div className="confirm-card">
        <p><b>Doctor:</b> {formData.doctor?.name}</p>
        <p><b>Specialty:</b> {formData.specialty}</p>
        <p><b>Date:</b> {formData.date}</p>
        <p><b>Time:</b> {formData.time}</p>
        <p><b>Fee:</b> ₹{formData.doctor?.fee}</p>
      </div>
      <button onClick={prevStep}>Back</button>
      <button onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
}
