import React, { useState } from 'react';
import './UpdatePatient.css';
import PatientSearch from './PatientSearch';
import PatientUpdateForm from './PatientUpdateForm';

const UpdatePatient = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('search'); // 'search', 'results', 'form'
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (type) => {
    setSearchType(type);
    setSearchValue('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setCurrentStep('results');
    }, 1500);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setCurrentStep('form');
  };

  const handleBackToSearch = () => {
    setCurrentStep('search');
    setSearchType('');
    setSearchValue('');
  };

  const handleBackToResults = () => {
    setCurrentStep('results');
    setSelectedPatient(null);
  };

  const handleSavePatient = (formData) => {
    // Here you would save the data to your backend
    console.log('Saving patient data:', formData);
    alert('Patient records updated successfully!');
    onBack(); // Go back to dashboard
  };

  // Show search results
  if (currentStep === 'results') {
    return (
      <PatientSearch 
        searchType={searchType}
        searchValue={searchValue}
        onBack={handleBackToSearch}
        onPatientSelect={handlePatientSelect}
      />
    );
  }

  // Show patient update form
  if (currentStep === 'form') {
    return (
      <PatientUpdateForm 
        patient={selectedPatient}
        onBack={handleBackToResults}
        onSave={handleSavePatient}
      />
    );
  }

  // Show search options (default)
  return (
    <div className="update-patient-container">
      <div className="update-patient-content">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
          <div className="header-info">
            <h1 className="page-title">Update Patient Report</h1>
            <p className="page-subtitle">Search and update patient records</p>
          </div>
        </div>

        {!searchType ? (
          /* Search Options */
          <div className="search-options">
            <h2 className="section-title">Choose Search Method</h2>
            
            <button 
              className="search-option-btn phone-search"
              onClick={() => handleSearch('phone')}
            >
              <div className="option-icon">📱</div>
              <div className="option-content">
                <div className="option-title">Search by Phone Number</div>
                <div className="option-subtitle">Find patient using mobile number</div>
              </div>
              <div className="option-arrow">→</div>
            </button>

            <button 
              className="search-option-btn record-search"
              onClick={() => handleSearch('record')}
            >
              <div className="option-icon">🆔</div>
              <div className="option-content">
                <div className="option-title">Search by Record ID</div>
                <div className="option-subtitle">Find patient using hospital record ID</div>
              </div>
              <div className="option-arrow">→</div>
            </button>
          </div>
        ) : (
          /* Search Form */
          <div className="search-form-container">
            <div className="search-form-header">
              <button 
                className="change-method-btn"
                onClick={() => setSearchType('')}
              >
                ← Change Method
              </button>
              <h3 className="form-title">
                Search by {searchType === 'phone' ? 'Phone Number' : 'Record ID'}
              </h3>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="input-group">
                <label className="input-label">
                  {searchType === 'phone' ? 'Phone Number' : 'Record ID'}
                </label>
                <input
                  type={searchType === 'phone' ? 'tel' : 'text'}
                  className="search-input"
                  placeholder={
                    searchType === 'phone' 
                      ? 'Enter 10-digit phone number' 
                      : 'Enter patient record ID'
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  disabled={isSearching}
                />
              </div>

              <button 
                type="submit" 
                className="search-submit-btn"
                disabled={!searchValue.trim() || isSearching}
              >
                {isSearching ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Searching...
                  </>
                ) : (
                  <>
                    <span className="search-icon">🔍</span>
                    Search Patient
                  </>
                )}
              </button>
            </form>

            {/* Sample Instructions */}
            <div className="search-instructions">
              <h4 className="instructions-title">Search Tips:</h4>
              <ul className="instructions-list">
                {searchType === 'phone' ? (
                  <>
                    <li>Enter complete 10-digit mobile number</li>
                    <li>Don't include country code (+91)</li>
                    <li>Example: 9876543210</li>
                  </>
                ) : (
                  <>
                    <li>Enter complete record ID as provided</li>
                    <li>Record ID format: PAT-XXXX-YYYY</li>
                    <li>Example: PAT-2024-0123</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePatient;
