import React from "react";
import "./UploadReports.css";

const reportData = [
  {
    id: 1,
    title: "Blood Test Report",
    size: "2.1 MB",
    date: "1/15/2024",
    type: "PDF"
  },
  {
    id: 2,
    title: "X-Ray Chest",
    size: "1.5 MB",
    date: "1/10/2024",
    type: "IMAGE"
  },
  {
    id: 3,
    title: "ECG Report",
    size: "890 KB",
    date: "1/8/2024",
    type: "PDF"
  }
];

function UploadReports() {
  return (
    <div className="upload-reports-container">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="back-arrow">&larr;</span>
        <h2>Upload Reports</h2>
      </div>

      {/* Upload New Report */}
      <div className="card">
        <h3>Upload New Report</h3>
        <div className="upload-note">Take a photo or select from gallery</div>
        <div className="upload-actions">
          <button className="report-btn">📷 Take Photo</button>
          <button className="report-btn">🖼 From Gallery</button>
        </div>
        <p className="supported-formats">
          Supported formats: JPG, PNG, PDF · Max size: 10MB
        </p>
      </div>

      {/* Health Reports List */}
      <div className="card">
        <h3>Your Health Reports</h3>
        <div className="upload-note">Previously uploaded reports and documents</div>
        <div className="reports-list">
          {reportData.map((report) => (
            <div className="report-row" key={report.id}>
              <div className={`report-thumb ${report.type}`}></div>
              <div className="report-info">
                <div className="report-title">{report.title}</div>
                <div className="report-meta">{`${report.size} · ${report.date}`}</div>
                <div className="report-type">{report.type}</div>
              </div>
              <div className="report-row-actions">
                <span className="report-row-icon">🔗</span>
                <span className="report-row-icon">🔄</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Tips */}
      <div className="tips-card">
        <h4>Upload Tips</h4>
        <ul>
          <li>Ensure good lighting when taking photos</li>
          <li>Keep the camera steady to avoid blur</li>
          <li>Make sure all text is clearly visible</li>
          <li>Upload reports in chronological order</li>
          <li>Include patient name and date on reports</li>
        </ul>
      </div>

      {/* Share Reports Button */}
      <div className="share-with-doctor-section">
        <button className="share-btn">Share Reports with Doctor</button>
        <div className="share-note">
          Selected reports will be shared securely with your healthcare provider
        </div>
      </div>
    </div>
  );
}

export default UploadReports;
