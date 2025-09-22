import React from "react";

const doctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialty: "General Medicine",
    experience: "15 years",
    rating: 4.8,
    fee: 500,
    languages: ["Hindi", "English", "Punjabi"],
    available: true,
    image: "https://via.placeholder.com/80" // replace with real doctor image
  },
];

export default function Step2Doctor({ nextStep, prevStep, setFormData }) {
  const handleSelect = (doctor) => {
    setFormData((prev) => ({ ...prev, doctor }));
    nextStep();
  };

  return (
    <div>
      <h3>Select Doctor</h3>
      {doctors.map((doc) => (
        <div key={doc.name} className="doctor-card" onClick={() => handleSelect(doc)}>
          <img src={doc.image} alt={doc.name} className="doctor-img" />
          <div>
            <h4>{doc.name}</h4>
            <p>{doc.specialty}</p>
            <p>{doc.experience} experience</p>
            <p>⭐ {doc.rating} — ₹{doc.fee}</p>
            <div>
              {doc.languages.map((lang) => (
                <span key={lang} className="tag">{lang}</span>
              ))}
              {doc.available && <span className="tag available">Available</span>}
            </div>
          </div>
        </div>
      ))}
      <button onClick={prevStep}>Back</button>
    </div>
  );
}
