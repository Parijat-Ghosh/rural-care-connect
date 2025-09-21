
import dotenv = require('dotenv');
dotenv.config();
import express = require('express');
import mongoose = require('mongoose');
import cors = require('cors');
import patientRouter from './routes/patient-routes';
import { errorHandler, notFoundHandler } from './middlewares/error-middleware';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Telemedicine API Server is running ✅',
    version: '1.0.0',
    endpoints: {
      createPatient: 'POST /api/patients',
      getAllPatients: 'GET /api/patients',
      getPatient: 'GET /api/patients/:id',
      updatePatient: 'PATCH /api/patients/:id',
      deletePatient: 'DELETE /api/patients/:id'
    }
  });
});


app.get('/health', (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});


app.use('/api/patients', patientRouter);


app.use(notFoundHandler);


app.use(errorHandler);


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/telemedicine";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📍 Database:", mongoose.connection.db?.databaseName);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API Documentation: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`👤 Patients API: http://localhost:${PORT}/api/patients`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });


process.on('SIGINT', async () => {
  console.log('🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ Database connection closed');
  process.exit(0);
});