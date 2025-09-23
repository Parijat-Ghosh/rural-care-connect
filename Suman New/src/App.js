import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MedicoDashboard from './MedicoDashboard';
import UploadReports from './UploadReports';
import Prescriptions from './Prescriptions';
import HealthRecords from './HealthRecords';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <Link to="/">Dashboard</Link>
        <Link to="/reports">Upload Reports</Link>
        <Link to="/prescriptions">Prescriptions</Link>
        <Link to="/healthrecords">Health Records</Link>
      </nav>

      {/* Routing */}
      <Routes>
        <Route path="/" element={<MedicoDashboard />} />
        <Route path="/reports" element={<UploadReports />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/healthrecords" element={<HealthRecords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
