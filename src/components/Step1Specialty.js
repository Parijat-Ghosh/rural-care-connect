import React from "react";

const specialties = [
  { name: "General Medicine", doctors: 5, icon: "🩺" },
  { name: "Cardiology", doctors: 3, icon: "❤️" },
  { name: "Dermatology", doctors: 2, icon: "🧴" },
  { name: "Pediatrics", doctors: 4, icon: "👶" },
  { name: "Orthopedics", doctors: 2, icon: "🦴" },
  { name: "Gynecology", doctors: 3, icon: "👩‍⚕️" },
];

export default function Step1Specialty({ nextStep, setFormData }) {
  const handleSelect = (specialty) => {
    setFormData((prev) => ({ ...prev, specialty }));
    nextStep();
  };

  return (
    <div>
      <h3>Select Specialty</h3>
      <div className="grid">
        {specialties.map((s) => (
          <div key={s.name} className="card" onClick={() => handleSelect(s.name)}>
            <div className="icon">{s.icon}</div>
            <h4>{s.name}</h4>
            <span>{s.doctors} doctors</span>
          </div>
        ))}
      </div>
    </div>
  );
}
