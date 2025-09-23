import React, { useState } from 'react';
import './ManageDoctors.css';

const ManageDoctors = ({ onBack }) => {
  const [registrationKeys, setRegistrationKeys] = useState([
    {
      id: 1,
      key: 'DOC-2024-A7X9M',
      generatedDate: '2024-01-15',
      expiryDate: '2024-02-15',
      status: 'used',
      usedBy: 'Dr. Priya Singh'
    },
    {
      id: 2,
      key: 'DOC-2024-B3K8L',
      generatedDate: '2024-01-20',
      expiryDate: '2024-02-20',
      status: 'expired',
      usedBy: null
    }
  ]);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Priya Singh',
      specialization: 'Cardiology',
      phone: '+91 98765 43210',
      email: 'priya.singh@hospital.com',
      joinDate: '2024-01-15',
      status: 'active',
      experience: '8 years',
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neurology',
      phone: '+91 87654 32109',
      email: 'rajesh.kumar@hospital.com',
      joinDate: '2023-12-10',
      status: 'active',
      experience: '12 years',
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialization: 'Orthopedics',
      phone: '+91 76543 21098',
      email: 'amit.patel@hospital.com',
      joinDate: '2024-01-08',
      status: 'inactive',
      experience: '6 years',
      avatar: '👨‍⚕️'
    }
  ]);

  const [showKeyModal, setShowKeyModal] = useState(false);
  const [generatingKey, setGeneratingKey] = useState(false);
  const [newKey, setNewKey] = useState('');

  const generateRegistrationKey = () => {
    setGeneratingKey(true);
    
    // Simulate key generation
    setTimeout(() => {
      const keyId = Math.random().toString(36).substr(2, 5).toUpperCase();
      const newRegistrationKey = `DOC-2024-${keyId}`;
      const currentDate = new Date().toISOString().split('T')[0];
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      
      const key = {
        id: Date.now(),
        key: newRegistrationKey,
        generatedDate: currentDate,
        expiryDate: expiryDate.toISOString().split('T')[0],
        status: 'active',
        usedBy: null
      };

      setRegistrationKeys(prev => [key, ...prev]);
      setNewKey(newRegistrationKey);
      setGeneratingKey(false);
      setShowKeyModal(true);
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Registration key copied to clipboard!');
  };

  const toggleDoctorStatus = (id) => {
    setDoctors(prev => prev.map(doctor => 
      doctor.id === id 
        ? { ...doctor, status: doctor.status === 'active' ? 'inactive' : 'active' }
        : doctor
    ));
  };

  const deleteRegistrationKey = (id) => {
    if (confirm('Are you sure you want to delete this registration key?')) {
      setRegistrationKeys(prev => prev.filter(key => key.id !== id));
    }
  };

  return (
    <div className="manage-doctors-container">
      <div className="manage-doctors-content">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
          <div className="header-info">
            <h1 className="page-title">Manage Doctors</h1>
            <p className="page-subtitle">Add and manage doctor registrations</p>
          </div>
        </div>

        {/* Add Doctor Section */}
        <div className="add-doctor-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">🔑</span>
              Doctor Registration
            </h2>
          </div>

          <div className="key-generation-card">
            <div className="key-info">
              <h3>Generate Registration Key</h3>
              <p>Create a one-time use key for new doctor registration. Key expires in 30 days.</p>
            </div>
            
            <button 
              className="generate-key-btn"
              onClick={generateRegistrationKey}
              disabled={generatingKey}
            >
              {generatingKey ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Generating...
                </>
              ) : (
                <>
                  <span className="key-icon">🔑</span>
                  Generate New Key
                </>
              )}
            </button>
          </div>

          {/* Registration Keys History */}
          <div className="keys-history">
            <h3 className="history-title">Registration Keys History</h3>
            
            {registrationKeys.length === 0 ? (
              <div className="no-keys">
                <span className="no-keys-icon">🔑</span>
                <p>No registration keys generated yet</p>
              </div>
            ) : (
              registrationKeys.map(key => (
                <div key={key.id} className="key-card">
                  <div className="key-main">
                    <div className="key-code">
                      <code>{key.key}</code>
                      <button 
                        className="copy-btn"
                        onClick={() => copyToClipboard(key.key)}
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                    
                    <div className="key-details">
                      <span className="key-date">Generated: {key.generatedDate}</span>
                      <span className="key-expiry">Expires: {key.expiryDate}</span>
                      {key.usedBy && <span className="key-used">Used by: {key.usedBy}</span>}
                    </div>
                  </div>

                  <div className="key-actions">
                    <div className={`key-status ${key.status}`}>
                      {key.status === 'active' ? '🟢 Active' : 
                       key.status === 'used' ? '✅ Used' : '🔴 Expired'}
                    </div>
                    
                    {key.status !== 'used' && (
                      <button 
                        className="delete-key-btn"
                        onClick={() => deleteRegistrationKey(key.id)}
                        title="Delete key"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Registered Doctors Section */}
        <div className="doctors-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">👥</span>
              Registered Doctors ({doctors.length})
            </h2>
          </div>

          <div className="doctors-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <div className="doctor-avatar">
                    <span className="avatar-emoji">{doctor.avatar}</span>
                  </div>
                  
                  <div className="doctor-basic">
                    <h3 className="doctor-name">{doctor.name}</h3>
                    <p className="doctor-specialization">{doctor.specialization}</p>
                    <div className={`doctor-status ${doctor.status}`}>
                      {doctor.status === 'active' ? '🟢 Active' : '🟡 Inactive'}
                    </div>
                  </div>

                  <button 
                    className={`status-toggle-btn ${doctor.status}`}
                    onClick={() => toggleDoctorStatus(doctor.id)}
                    title={`Set ${doctor.status === 'active' ? 'inactive' : 'active'}`}
                  >
                    {doctor.status === 'active' ? '⏸️' : '▶️'}
                  </button>
                </div>

                <div className="doctor-details">
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <span className="detail-text">{doctor.phone}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">✉️</span>
                    <span className="detail-text">{doctor.email}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span className="detail-text">Joined: {doctor.joinDate}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">🎓</span>
                    <span className="detail-text">Experience: {doctor.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal for Generated Key */}
      {showKeyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="success-icon">🎉</div>
            <h3>Registration Key Generated!</h3>
            <div className="generated-key">
              <code>{newKey}</code>
              <button 
                className="copy-key-btn"
                onClick={() => copyToClipboard(newKey)}
              >
                📋 Copy
              </button>
            </div>
            <p className="key-instructions">
              Share this key with the new doctor for one-time registration. 
              The key expires in 30 days.
            </p>
            <div className="modal-actions">
              <button 
                className="modal-btn confirm"
                onClick={() => setShowKeyModal(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
