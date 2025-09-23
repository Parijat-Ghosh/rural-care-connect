import React, { useState } from 'react';
import './PatientSearch.css';

const PatientSearch = ({ searchType, searchValue, onBack, onPatientSelect }) => {
  // Mock patient data - in real app, this would come from API
  const mockPatients = [
    {
      id: 'HR001',
      name: 'Rajesh Kumar',
      age: 38,
      gender: 'Male',
      phone: '9876543210',
      bloodType: 'B+',
      lastVisit: '15/01/2024',
      avatar: '👨'
    },
    {
      id: 'HR002', 
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      phone: '9876543210',
      bloodType: 'A+',
      lastVisit: '12/01/2024',
      avatar: '👩'
    },
    {
      id: 'HR003',
      name: 'Arjun Singh',
      age: 28,
      gender: 'Male',
      phone: '9876543210',
      bloodType: 'O+',
      lastVisit: '10/01/2024',
      avatar: '👨'
    }
  ];

  return (
    <div className="patient-search-container">
      <div className="patient-search-content">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
          <div className="header-info">
            <h1 className="page-title">Search Results</h1>
            <p className="page-subtitle">
              Found {mockPatients.length} patient(s) for {searchType === 'phone' ? 'phone' : 'record'}: {searchValue}
            </p>
          </div>
        </div>

        {/* Patient List */}
        <div className="patient-list">
          <h2 className="section-title">Select Patient</h2>
          
          {mockPatients.map((patient) => (
            <button 
              key={patient.id}
              className="patient-card"
              onClick={() => onPatientSelect(patient)}
            >
              <div className="patient-avatar">
                <span className="avatar-emoji">{patient.avatar}</span>
              </div>
              
              <div className="patient-info">
                <div className="patient-main-info">
                  <h3 className="patient-name">{patient.name}</h3>
                  <div className="patient-details">
                    <span className="patient-age">{patient.age}Y • {patient.gender}</span>
                    <span className="patient-blood">Blood: {patient.bloodType}</span>
                  </div>
                </div>
                
                <div className="patient-meta">
                  <div className="patient-id">ID: {patient.id}</div>
                  <div className="patient-phone">📱 {patient.phone}</div>
                  <div className="patient-visit">Last visit: {patient.lastVisit}</div>
                </div>
              </div>
              
              <div className="select-arrow">→</div>
            </button>
          ))}
        </div>

        {/* Search Again Button */}
        <div className="search-actions">
          <button className="search-again-btn" onClick={onBack}>
            🔍 Search Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;
