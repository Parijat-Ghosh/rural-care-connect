import React, { useState } from "react";

export default function Step3DateTime({ nextStep, prevStep, setFormData }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleConfirm = () => {
    if (date && time) {
      setFormData((prev) => ({ ...prev, date, time }));
      nextStep();
    } else {
      alert("Please select date and time");
    }
  };

  return (
    <div>
      <h3>Select Date & Time</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="time-grid">
        {["09:00", "09:30", "10:00", "10:30", "11:00"].map((t) => (
          <button
            key={t}
            className={time === t ? "selected" : ""}
            onClick={() => setTime(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleConfirm}>Continue</button>
      </div>
    </div>
  );
}
