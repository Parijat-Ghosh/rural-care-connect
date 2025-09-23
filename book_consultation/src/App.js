import React, { useState } from "react";
import Step1Specialty from "./components/Step1Specialty";
import Step2Doctor from "./components/Step2Doctor";
import Step3DateTime from "./components/Step3DateTime";
import Step4Confirm from "./components/Step4Confirm";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "",
    doctor: null,
    date: "",
    time: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="container">
      <h2>Book Consultation</h2>
      <ProgressBar step={step} />

      {step === 1 && (
        <Step1Specialty nextStep={nextStep} setFormData={setFormData} />
      )}
      {step === 2 && (
        <Step2Doctor
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <Step3DateTime
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <Step4Confirm prevStep={prevStep} formData={formData} />
      )}
    </div>
  );
}

export default App;
