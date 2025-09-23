
// import dotenv = require('dotenv');
// dotenv.config();
// import express = require('express');
// import mongoose = require('mongoose');
// import cors = require('cors');
// import patientRouter from './routes/patient-routes';
// import { errorHandler, notFoundHandler } from './middlewares/error-middleware';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '2mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Basic logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// });

// // Basic route
// app.get('/', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Rural Healthcare Connect API Server is running ✅',
//     version: '2.0.0',
//     endpoints: {
//       auth: {
//         signup: 'POST /api/patients/signup',
//         login: 'POST /api/patients/login'
//       },
//       patient: {
//         getProfile: 'GET /api/patients/profile',
//         updateHealth: 'PATCH /api/patients/health'
//       },
//       family: {
//         addMember: 'POST /api/patients/family/add',
//         getMembers: 'GET /api/patients/family',
//         getMember: 'GET /api/patients/family/:memberName',
//         updateMemberHealth: 'PATCH /api/patients/family/:memberName/health',
//         deleteMember: 'DELETE /api/patients/family/:memberName'
//       },
//       ai: {  // Add this section
//         chat: 'POST /api/ai/chat',
//       }
//     }
//   });
// });

// // Health check route
// app.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // API Routes
// app.use('/api/patients', patientRouter);

// // Handle 404 routes
// app.use(notFoundHandler);

// // Error handling middleware (must be last)
// app.use(errorHandler);

// // MongoDB connection
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Patient";

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//     console.log("📍 Database:", mongoose.connection.db?.databaseName);
    
//     app.listen(PORT, () => {
//       console.log(`🚀 Rural Healthcare Connect API running on http://localhost:${PORT}`);
//       console.log(`📋 API Documentation: http://localhost:${PORT}`);
//       console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
//       console.log(`👤 Auth Endpoints: http://localhost:${PORT}/api/patients/signup`);
//       console.log(`👨‍👩‍👧‍👦 Family Management: http://localhost:${PORT}/api/patients/family`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('🛑 Shutting down gracefully...');
//   await mongoose.connection.close();
//   console.log('✅ Database connection closed');
//   process.exit(0);
// });


import dotenv = require('dotenv');
dotenv.config();

import express = require('express');
import mongoose = require('mongoose');
import cors = require('cors');
import patientRouter from './routes/patient-routes';
import aiRouter from './routes/ai-routes';  
import { errorHandler, notFoundHandler } from './middlewares/error-middleware';
import doctorRouter from './routes/doctor-routes';
import appointmentRouter from './routes/appointment-routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Rural Healthcare Connect API Server is running ',
    version: '2.0.0',
    endpoints: {
      auth: {
        signup: 'POST /api/patients/signup',
        login: 'POST /api/patients/login'
      },
      patient: {
        getProfile: 'GET /api/patients/profile',
        updateHealth: 'PATCH /api/patients/health'
      },
      family: {
        addMember: 'POST /api/patients/family/add',
        getMembers: 'GET /api/patients/family',
        getMember: 'GET /api/patients/family/:memberName',
        updateMemberHealth: 'PATCH /api/patients/family/:memberName/health',
        deleteMember: 'DELETE /api/patients/family/:memberName'
      },
      ai: { 
        chat: 'POST /api/ai/chat'
      },
      doctors: {
                register: 'POST /api/doctors/register',
                login: 'POST /api/doctors/login',
                profile: 'GET /api/doctors/profile',
                updateProfile: 'PUT /api/doctors/profile',
                getAllDoctors: 'GET /api/doctors/all'
            },
            appointments: {
                bookAppointment: 'POST /api/appointments/book',
                getPatientAppointments: 'GET /api/appointments/patient',
                getDoctorAppointments: 'GET /api/appointments/doctor',
                cancelAppointment: 'DELETE /api/appointments/cancel/:appointmentUniqueId',
                completeAppointment: 'PUT /api/appointments/complete/:appointmentUniqueId'
            }
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use('/api/patients', patientRouter);
app.use('/api/ai', aiRouter);  
app.use('/api/patients', patientRouter);
app.use('/api/ai', aiRouter);
app.use('/api/doctors', doctorRouter);      
app.use('/api/appointments', appointmentRouter);

// Handle 404 routes
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Patient";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected successfully");
    console.log(" Database:", mongoose.connection.db?.databaseName);
    
    app.listen(PORT, () => {
      console.log(` Rural Healthcare Connect API running on http://localhost:${PORT}`);
      console.log(` API Documentation: http://localhost:${PORT}`);
      console.log(` Health Check: http://localhost:${PORT}/health`);
      console.log(` Auth Endpoints: http://localhost:${PORT}/api/patients/signup`);
      console.log(` Family Management: http://localhost:${PORT}/api/patients/family`);
      console.log(` AI Chat: http://localhost:${PORT}/api/ai/chat`);  // ✅ ADD THIS LINE
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log(' Shutting down gracefully...');
  await mongoose.connection.close();
  console.log(' Database connection closed');
  process.exit(0);
});
