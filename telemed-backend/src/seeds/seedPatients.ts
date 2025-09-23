import dotenv = require("dotenv");
dotenv.config();
import { connectDB } from "../config/db";
import PatientModel from "../models/patient-model";

const patients = [
  {
    primaryPhone: "9876543210",
    firstName: "Sukhdev",
    lastName: "Singh",
    gender: "male",
    address: {
      village: "Bhikhi",
      district: "Patiala",
      state: "Punjab",
      pincode: "147201",
    },
    comorbidities: ["hypertension"],
    allergies: ["none"],
    consent: { telemedicine: true, dataShare: false },
  },
  {
    primaryPhone: "9988776655",
    firstName: "Harpreet",
    lastName: "Kaur",
    gender: "female",
    address: {
      village: "Nabha",
      district: "Patiala",
      state: "Punjab",
      pincode: "147201",
    },
    comorbidities: [],
    allergies: ["penicillin"],
    consent: { telemedicine: true, dataShare: true },
  },
];

(async () => {
  await connectDB();
  await PatientModel.deleteMany({});
  await PatientModel.insertMany(patients);
  console.log("Seeded patients");
  process.exit(0);
})();
