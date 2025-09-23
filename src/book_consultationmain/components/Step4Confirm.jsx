import React, { useState } from "react";

export default function Step4Confirm({ prevStep, formData }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to book consultation");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>✅ Appointment Confirmed!</h3>
        <p>
          {formData.specialty} consultation with {formData.doctor?.name} on{" "}
          {formData.date} at {formData.time}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>Confirm Your Appointment</h3>
      <p><b>Specialty:</b> {formData.specialty}</p>
      <p><b>Doctor:</b> {formData.doctor?.name}</p>
      <p><b>Experience:</b> {formData.doctor?.experience} years</p>
      <p><b>Fee:</b> ₹{formData.doctor?.fee}</p>
      <p><b>Date:</b> {formData.date}</p>
      <p><b>Time:</b> {formData.time}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Booking..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
