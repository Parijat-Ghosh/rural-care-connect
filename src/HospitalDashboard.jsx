import React, { useState } from 'react';
import './HospitalDashboard.css';
import UpdatePatient from './UpdatePatient';
import ManageDoctors from './ManageDoctors';

const HospitalDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Existing states (keep as is)
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Emergency Alert',
      message: 'Patient in Room 204 requires immediate attention',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Doctor Registration',
      message: 'Dr. Amit Sharma has completed registration',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight at 2:00 AM',
      time: '3 hours ago',
      read: false
    }
  ]);

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translatedContent, setTranslatedContent] = useState({
    hospitalName: 'City General Hospital',
    hospitalLocation: 'Medical Center - Nabha',
    updatePatient: 'Update Patient Report',
    updatePatientSub: 'Add medical records & diagnosis',
    manageDoctors: 'Manage Doctors',
    manageDoctorsSub: 'Add, edit or schedule doctors',
    totalPatients: 'Total Patients',
    activeDoctors: 'Active Doctors',
    todayAppointments: "Today's Appointments",
    departmentStatus: 'Department Status',
    cardiology: 'Cardiology',
    neurology: 'Neurology',
    orthopedics: 'Orthopedics',
    emergency: 'Emergency',
    doctorsAvailable: 'doctors available',
    doctorBusy: 'doctor busy',
    available247: '24/7 available'
  });
  const [isTranslating, setIsTranslating] = useState(false);

  // NEW: Settings states
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true,
    soundAlerts: true
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const handleUpdatePatientClick = () => {
    setCurrentPage('updatePatient');
  };

  const handleManageDoctorsClick = () => {
    setCurrentPage('manageDoctors');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Existing notification functions (keep as is)
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setNotificationCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (!notification.read) {
      setNotificationCount(prev => Math.max(0, prev - 1));
    }
  };

  // Existing language functions (keep as is)
  const translateTextFast = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`,
        { method: 'GET', headers: { 'Accept': 'application/json' } }
      );
      const data = await response.json();
      return data.responseStatus === 200 ? data.responseData.translatedText : text;
    } catch (error) {
      return text;
    }
  };

  const handleLanguageChange = async (languageCode, languageName) => {
    setShowLanguageDropdown(false);

    if (languageCode === 'en') {
      setTranslatedContent({
        hospitalName: 'City General Hospital',
        hospitalLocation: 'Medical Center - Nabha',
        updatePatient: 'Update Patient Report',
        updatePatientSub: 'Add medical records & diagnosis',
        manageDoctors: 'Manage Doctors',
        manageDoctorsSub: 'Add, edit or schedule doctors',
        totalPatients: 'Total Patients',
        activeDoctors: 'Active Doctors',
        todayAppointments: "Today's Appointments",
        departmentStatus: 'Department Status',
        cardiology: 'Cardiology',
        neurology: 'Neurology',
        orthopedics: 'Orthopedics',
        emergency: 'Emergency',
        doctorsAvailable: 'doctors available',
        doctorBusy: 'doctor busy',
        available247: '24/7 available'
      });
      setCurrentLanguage(languageCode);
      return;
    }

    setIsTranslating(true);

    try {
      const textsToTranslate = {
        hospitalName: 'City General Hospital',
        hospitalLocation: 'Medical Center - Nabha',
        updatePatient: 'Update Patient Report',
        updatePatientSub: 'Add medical records & diagnosis',
        manageDoctors: 'Manage Doctors',
        manageDoctorsSub: 'Add, edit or schedule doctors',
        totalPatients: 'Total Patients',
        activeDoctors: 'Active Doctors',
        todayAppointments: "Today's Appointments",
        departmentStatus: 'Department Status',
        cardiology: 'Cardiology',
        neurology: 'Neurology',
        orthopedics: 'Orthopedics',
        emergency: 'Emergency',
        doctorsAvailable: 'doctors available',
        doctorBusy: 'doctor busy',
        available247: '24/7 available'
      };

      const translationPromises = Object.entries(textsToTranslate).map(
        async ([key, text]) => [key, await translateTextFast(text, languageCode)]
      );

      const results = await Promise.all(translationPromises);
      const translatedTexts = Object.fromEntries(results);

      setTranslatedContent(translatedTexts);
      setCurrentLanguage(languageCode);
      
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // NEW: Settings functions
  const handleSettingsClick = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const toggleSetting = (settingName) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }));
  };

  const handleProfileEdit = () => {
    setShowSettingsDropdown(false);
    alert('Profile editing feature coming soon!');
  };

  const handleChangePassword = () => {
    setShowSettingsDropdown(false);
    alert('Password change feature coming soon!');
  };

  const handleDataBackup = () => {
    setShowSettingsDropdown(false);
    alert('Downloading backup... Feature coming soon!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setShowSettingsDropdown(false);
      alert('Logging out... Redirecting to login page');
      // Here you would redirect to login page
    }
  };

  if (currentPage === 'updatePatient') {
    return <UpdatePatient onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'manageDoctors') {
    return <ManageDoctors onBack={handleBackToDashboard} />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="header">
          <div className="hospital-info">
            <div className="hospital-icon">
              <span className="hospital-emoji">🏥</span>
            </div>
            <div className="hospital-details">
              <h1 className="hospital-name">{translatedContent.hospitalName}</h1>
              <p className="hospital-location">{translatedContent.hospitalLocation}</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="header-btn notification-btn" 
              onClick={handleNotificationClick}
            >
              🔔
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
            <button 
              className="header-btn language-btn" 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              disabled={isTranslating}
            >
              {isTranslating ? '⏳' : '🌐'}
            </button>
            <button 
              className="header-btn settings-btn" 
              onClick={handleSettingsClick}
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* Existing Notification Dropdown (keep as is) */}
        {showNotifications && (
          <div className="notifications-dropdown">
            <div className="notifications-header">
              <h3>Notifications</h3>
              <div className="notification-actions">
                <button className="mark-all-btn" onClick={markAllRead}>
                  Mark all read
                </button>
                <button className="close-btn" onClick={() => setShowNotifications(false)}>
                  ×
                </button>
              </div>
            </div>
            
            <div className="notifications-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                >
                  <div className="notification-content" onClick={() => markNotificationRead(notification.id)}>
                    <div className="notification-icon">
                      {notification.type === 'urgent' ? '🚨' :
                       notification.type === 'info' ? 'ℹ️' :
                       notification.type === 'system' ? '🔧' : '✅'}
                    </div>
                    <div className="notification-text">
                      <h4 className="notification-title">{notification.title}</h4>
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                  <button 
                    className="delete-notification-btn"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Existing Language Dropdown (keep as is) */}
        {showLanguageDropdown && (
          <div className="language-dropdown">
            <div className="language-header">
              <h3>Select Language</h3>
              <button className="close-btn" onClick={() => setShowLanguageDropdown(false)}>
                ×
              </button>
            </div>
            
            <div className="language-list">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.code, lang.name)}
                  disabled={isTranslating}
                >
                  <span className="language-flag">{lang.flag}</span>
                  <span className="language-name">{lang.name}</span>
                  {currentLanguage === lang.code && <span className="check-icon">✓</span>}
                </button>
              ))}
            </div>
            
            {isTranslating && (
              <div className="translation-loading">
                <span className="loading-spinner">⏳</span> Translating...
              </div>
            )}
          </div>
        )}

        {/* NEW: Settings Dropdown */}
        {showSettingsDropdown && (
          <div className="settings-dropdown">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-btn" onClick={() => setShowSettingsDropdown(false)}>
                ×
              </button>
            </div>
            
            <div className="settings-content">
              {/* Account Section */}
              <div className="settings-section">
                <h4 className="settings-section-title">Account</h4>
                
                <button className="setting-item" onClick={handleProfileEdit}>
                  <div className="setting-info">
                    <span className="setting-icon">👤</span>
                    <span className="setting-name">Edit Profile</span>
                  </div>
                  <span className="setting-arrow">→</span>
                </button>

                <button className="setting-item" onClick={handleChangePassword}>
                  <div className="setting-info">
                    <span className="setting-icon">🔒</span>
                    <span className="setting-name">Change Password</span>
                  </div>
                  <span className="setting-arrow">→</span>
                </button>
              </div>

              {/* Preferences Section */}
              <div className="settings-section">
                <h4 className="settings-section-title">Preferences</h4>
                
                <div className="setting-item toggle-item">
                  <div className="setting-info">
                    <span className="setting-icon">🔔</span>
                    <span className="setting-name">Notifications</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications}
                      onChange={() => toggleSetting('notifications')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-item">
                  <div className="setting-info">
                    <span className="setting-icon">🌙</span>
                    <span className="setting-name">Dark Mode</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.darkMode}
                      onChange={() => toggleSetting('darkMode')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-item">
                  <div className="setting-info">
                    <span className="setting-icon">🔊</span>
                    <span className="setting-name">Sound Alerts</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.soundAlerts}
                      onChange={() => toggleSetting('soundAlerts')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {/* System Section */}
              <div className="settings-section">
                <h4 className="settings-section-title">System</h4>
                
                <button className="setting-item" onClick={handleDataBackup}>
                  <div className="setting-info">
                    <span className="setting-icon">📊</span>
                    <span className="setting-name">Download Backup</span>
                  </div>
                  <span className="setting-arrow">→</span>
                </button>

                <button className="setting-item logout-item" onClick={handleLogout}>
                  <div className="setting-info">
                    <span className="setting-icon">🚪</span>
                    <span className="setting-name">Logout</span>
                  </div>
                  <span className="setting-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rest of your existing content (keep as is) */}
        <div className="main-actions">
          <button className="action-btn update-btn" onClick={handleUpdatePatientClick}>
            <div className="btn-icon">📋</div>
            <div className="btn-content">
              <div className="btn-title">{translatedContent.updatePatient}</div>
              <div className="btn-subtitle">{translatedContent.updatePatientSub}</div>
            </div>
          </button>

          <button className="action-btn manage-btn" onClick={handleManageDoctorsClick}>
            <div className="btn-icon">👨‍⚕️</div>
            <div className="btn-content">
              <div className="btn-title">{translatedContent.manageDoctors}</div>
              <div className="btn-subtitle">{translatedContent.manageDoctorsSub}</div>
            </div>
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-number">342</div>
              <div className="stat-label">{translatedContent.totalPatients}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <div className="stat-number">24</div>
              <div className="stat-label">{translatedContent.activeDoctors}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <div className="stat-number">18</div>
              <div className="stat-label">{translatedContent.todayAppointments}</div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span className="section-icon">🏥</span>
            <h2 className="section-title">{translatedContent.departmentStatus}</h2>
          </div>

          <div className="department-item">
            <div className="department-icon">❤️</div>
            <div className="department-info">
              <h4 className="department-name">{translatedContent.cardiology}</h4>
              <p className="department-status">3 {translatedContent.doctorsAvailable}</p>
            </div>
            <div className="department-indicator available"></div>
          </div>

          <div className="department-item">
            <div className="department-icon">🧠</div>
            <div className="department-info">
              <h4 className="department-name">{translatedContent.neurology}</h4>
              <p className="department-status">2 {translatedContent.doctorsAvailable}</p>
            </div>
            <div className="department-indicator available"></div>
          </div>

          <div className="department-item">
            <div className="department-icon">🦴</div>
            <div className="department-info">
              <h4 className="department-name">{translatedContent.orthopedics}</h4>
              <p className="department-status">1 {translatedContent.doctorBusy}</p>
            </div>
            <div className="department-indicator busy"></div>
          </div>

          <div className="department-item">
            <div className="department-icon">🚑</div>
            <div className="department-info">
              <h4 className="department-name">{translatedContent.emergency}</h4>
              <p className="department-status">{translatedContent.available247}</p>
            </div>
            <div className="department-indicator available"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
