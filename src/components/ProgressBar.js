import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ step }) {
  return (
    <div className="progress">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`circle ${step >= s ? "active" : ""}`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
