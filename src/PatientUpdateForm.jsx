import React, { useState } from 'react';
import './PatientUpdateForm.css';

const PatientUpdateForm = ({ patient, onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    // Overview
    bloodType: patient?.bloodType || '',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension'],
    emergencyContact: {
      name: 'Priya Kumar',
      phone: '+91 98765 43210',
      relationship: 'Spouse'
    },
    
    // Vitals
    vitals: {
      bloodPressure: '130/85',
      heartRate: '72',
      weight: '75',
      height: '5\'8"',
      lastUpdated: new Date().toLocaleDateString()
    },
    
    // Vaccines
    vaccines: [
      {
        id: 1,
        name: 'COVID-19 Booster',
        given: '11/15/2023',
        nextDue: '11/15/2024',
        status: 'overdue'
      },
      {
        id: 2,
        name: 'Flu Shot',
        given: '10/1/2023',
        nextDue: '10/1/2024',
        status: 'overdue'
      }
    ],
    
    // History
    history: [
      {
        id: 1,
        date: '01/15/2024',
        type: 'Consultation',
        doctor: 'Dr. Smith',
        notes: 'Regular checkup. Blood pressure slightly elevated.',
        diagnosis: 'Hypertension monitoring'
      }
    ]
  });

  // Modal states
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    given: '',
    nextDue: '',
    status: 'current'
  });
  const [newHistory, setNewHistory] = useState({
    date: '',
    type: '',
    doctor: '',
    diagnosis: '',
    notes: ''
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  // Allergy functions
  const addAllergy = () => {
    if (newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newItem.trim()]
      }));
      setNewItem('');
      setShowAllergyModal(false);
    }
  };

  const removeAllergy = (index) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  // Condition functions
  const addCondition = () => {
    if (newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        chronicConditions: [...prev.chronicConditions, newItem.trim()]
      }));
      setNewItem('');
      setShowConditionModal(false);
    }
  };

  const removeCondition = (index) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.filter((_, i) => i !== index)
    }));
  };

  // Vaccine functions
  const addVaccine = () => {
    if (newVaccine.name.trim() && newVaccine.given && newVaccine.nextDue) {
      const vaccine = {
        id: Date.now(),
        ...newVaccine
      };
      setFormData(prev => ({
        ...prev,
        vaccines: [...prev.vaccines, vaccine]
      }));
      setNewVaccine({
        name: '',
        given: '',
        nextDue: '',
        status: 'current'
      });
      setShowVaccineModal(false);
    }
  };

  const removeVaccine = (id) => {
    setFormData(prev => ({
      ...prev,
      vaccines: prev.vaccines.filter(v => v.id !== id)
    }));
  };

  // History functions
  const addHistory = () => {
    if (newHistory.date && newHistory.type && newHistory.doctor) {
      const history = {
        id: Date.now(),
        ...newHistory
      };
      setFormData(prev => ({
        ...prev,
        history: [history, ...prev.history]
      }));
      setNewHistory({
        date: '',
        type: '',
        doctor: '',
        diagnosis: '',
        notes: ''
      });
      setShowHistoryModal(false);
    }
  };

  const removeHistory = (id) => {
    setFormData(prev => ({
      ...prev,
      history: prev.history.filter(h => h.id !== id)
    }));
  };

  const renderOverviewTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3 className="section-title">Basic Information</h3>
        
        <div className="form-group">
          <label className="form-label">Blood Type</label>
          <select 
            className="form-input"
            value={formData.bloodType}
            onChange={(e) => setFormData(prev => ({...prev, bloodType: e.target.value}))}
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Allergies & Conditions</h3>
        
        <div className="form-group">
          <label className="form-label">Allergies</label>
          <div className="tag-list">
            {formData.allergies.map((allergy, index) => (
              <div key={index} className="tag-with-remove allergy-tag">
                <span>{allergy}</span>
                <button 
                  type="button"
                  className="remove-tag-btn"
                  onClick={() => removeAllergy(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button"
              className="add-tag-btn"
              onClick={() => setShowAllergyModal(true)}
            >
              + Add Allergy
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Chronic Conditions</label>
          <div className="tag-list">
            {formData.chronicConditions.map((condition, index) => (
              <div key={index} className="tag-with-remove condition-tag">
                <span>{condition}</span>
                <button 
                  type="button"
                  className="remove-tag-btn"
                  onClick={() => removeCondition(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button"
              className="add-tag-btn"
              onClick={() => setShowConditionModal(true)}
            >
              + Add Condition
            </button>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Emergency Contact</h3>
        
        <div className="form-group">
          <label className="form-label">Name</label>
          <input 
            type="text"
            className="form-input"
            value={formData.emergencyContact.name}
            onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input 
            type="tel"
            className="form-input"
            value={formData.emergencyContact.phone}
            onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Relationship</label>
          <select 
            className="form-input"
            value={formData.emergencyContact.relationship}
            onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
          >
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Child">Child</option>
            <option value="Friend">Friend</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderVitalsTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3 className="section-title">Current Vitals</h3>
        <p className="section-subtitle">Last updated: {formData.vitals.lastUpdated}</p>
        
        <div className="vitals-grid">
          <div className="vital-card blood-pressure">
            <div className="vital-icon">❤️</div>
            <div className="vital-info">
              <label className="vital-label">Blood Pressure</label>
              <input 
                type="text"
                className="vital-input"
                value={formData.vitals.bloodPressure}
                onChange={(e) => handleInputChange('vitals', 'bloodPressure', e.target.value)}
                placeholder="130/85 mmHg"
              />
            </div>
          </div>

          <div className="vital-card heart-rate">
            <div className="vital-icon">💓</div>
            <div className="vital-info">
              <label className="vital-label">Heart Rate</label>
              <input 
                type="text"
                className="vital-input"
                value={formData.vitals.heartRate}
                onChange={(e) => handleInputChange('vitals', 'heartRate', e.target.value)}
                placeholder="72 bpm"
              />
            </div>
          </div>

          <div className="vital-card weight">
            <div className="vital-icon">⚖️</div>
            <div className="vital-info">
              <label className="vital-label">Weight</label>
              <input 
                type="text"
                className="vital-input"
                value={formData.vitals.weight}
                onChange={(e) => handleInputChange('vitals', 'weight', e.target.value)}
                placeholder="75 kg"
              />
            </div>
          </div>

          <div className="vital-card height">
            <div className="vital-icon">📏</div>
            <div className="vital-info">
              <label className="vital-label">Height</label>
              <input 
                type="text"
                className="vital-input"
                value={formData.vitals.height}
                onChange={(e) => handleInputChange('vitals', 'height', e.target.value)}
                placeholder="5 feet 8 inches"
              />
            </div>
          </div>
        </div>

        <button 
          type="button"
          className="update-vitals-btn"
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              vitals: {
                ...prev.vitals,
                lastUpdated: new Date().toLocaleDateString()
              }
            }));
          }}
        >
          🔄 Update Timestamp
        </button>
      </div>
    </div>
  );

  const renderVaccinesTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3 className="section-title">Vaccination Record</h3>
        
        {formData.vaccines.map((vaccine) => (
          <div key={vaccine.id} className="vaccine-card">
            <div className="vaccine-info">
              <h4 className="vaccine-name">{vaccine.name}</h4>
              <div className="vaccine-details">
                <span className="vaccine-date">Given: {vaccine.given}</span>
                <span className="vaccine-due">Next due: {vaccine.nextDue}</span>
              </div>
            </div>
            <div className="vaccine-actions">
              <div className={`vaccine-status ${vaccine.status}`}>
                {vaccine.status === 'overdue' ? 'Overdue' : 'Current'}
              </div>
              <button 
                type="button"
                className="remove-item-btn"
                onClick={() => removeVaccine(vaccine.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        <button 
          type="button"
          className="add-vaccine-btn"
          onClick={() => setShowVaccineModal(true)}
        >
          💉 Add New Vaccination
        </button>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3 className="section-title">Medical History</h3>
        
        {formData.history.map((record) => (
          <div key={record.id} className="history-card">
            <div className="history-header">
              <div className="history-date">{record.date}</div>
              <button 
                type="button"
                className="remove-item-btn"
                onClick={() => removeHistory(record.id)}
              >
                🗑️
              </button>
            </div>
            <div className="history-content">
              <h4 className="history-type">{record.type}</h4>
              <p className="history-doctor">Dr. {record.doctor}</p>
              <p className="history-diagnosis">{record.diagnosis}</p>
              <p className="history-notes">{record.notes}</p>
            </div>
          </div>
        ))}

        <button 
          type="button"
          className="add-history-btn"
          onClick={() => setShowHistoryModal(true)}
        >
          📝 Add New Record
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'vitals', label: 'Vitals', icon: '💓' },
    { id: 'history', label: 'History', icon: '📚' },
    { id: 'vaccines', label: 'Vaccines', icon: '💉' }
  ];

  return (
    <div className="patient-update-container">
      <div className="patient-update-content">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
          <div className="header-info">
            <h1 className="page-title">{patient?.name}</h1>
            <p className="page-subtitle">ID: {patient?.id} • Update Medical Records</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="form-container">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'vitals' && renderVitalsTab()}
          {activeTab === 'vaccines' && renderVaccinesTab()}
          {activeTab === 'history' && renderHistoryTab()}
        </div>

        {/* Save Button */}
        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>
            💾 Save Changes
          </button>
        </div>
      </div>

      {/* Modals */}
      {showAllergyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Allergy</h3>
            <input 
              type="text"
              className="modal-input"
              placeholder="Enter allergy name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowAllergyModal(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={addAllergy}>
                Add Allergy
              </button>
            </div>
          </div>
        </div>
      )}

      {showConditionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Condition</h3>
            <input 
              type="text"
              className="modal-input"
              placeholder="Enter condition name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowConditionModal(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={addCondition}>
                Add Condition
              </button>
            </div>
          </div>
        </div>
      )}

      {showVaccineModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Vaccination</h3>
            <input 
              type="text"
              className="modal-input"
              placeholder="Vaccine name (e.g., COVID-19, Flu Shot)"
              value={newVaccine.name}
              onChange={(e) => setNewVaccine(prev => ({...prev, name: e.target.value}))}
            />
            <input 
              type="date"
              className="modal-input"
              placeholder="Date given"
              value={newVaccine.given}
              onChange={(e) => setNewVaccine(prev => ({...prev, given: e.target.value}))}
            />
            <input 
              type="date"
              className="modal-input"
              placeholder="Next due date"
              value={newVaccine.nextDue}
              onChange={(e) => setNewVaccine(prev => ({...prev, nextDue: e.target.value}))}
            />
            <select 
              className="modal-input"
              value={newVaccine.status}
              onChange={(e) => setNewVaccine(prev => ({...prev, status: e.target.value}))}
            >
              <option value="current">Current</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowVaccineModal(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={addVaccine}>
                Add Vaccine
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Medical Record</h3>
            <input 
              type="date"
              className="modal-input"
              value={newHistory.date}
              onChange={(e) => setNewHistory(prev => ({...prev, date: e.target.value}))}
            />
            <select 
              className="modal-input"
              value={newHistory.type}
              onChange={(e) => setNewHistory(prev => ({...prev, type: e.target.value}))}
            >
              <option value="">Select record type</option>
              <option value="Consultation">Consultation</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency">Emergency</option>
              <option value="Lab Test">Lab Test</option>
              <option value="Imaging">Imaging</option>
              <option value="Prescription">Prescription</option>
            </select>
            <input 
              type="text"
              className="modal-input"
              placeholder="Doctor name"
              value={newHistory.doctor}
              onChange={(e) => setNewHistory(prev => ({...prev, doctor: e.target.value}))}
            />
            <input 
              type="text"
              className="modal-input"
              placeholder="Diagnosis"
              value={newHistory.diagnosis}
              onChange={(e) => setNewHistory(prev => ({...prev, diagnosis: e.target.value}))}
            />
            <textarea 
              className="modal-textarea"
              placeholder="Additional notes"
              value={newHistory.notes}
              onChange={(e) => setNewHistory(prev => ({...prev, notes: e.target.value}))}
              rows={3}
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowHistoryModal(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={addHistory}>
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientUpdateForm;
