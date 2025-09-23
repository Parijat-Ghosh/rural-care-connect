import express from 'express';
import appointmentController from '../controllers/appointment-controller';
import { authenticateToken } from '../middlewares/auth-middleware';  // Fixed: matches your existing pattern
import { validateBody, validateParams, validateQuery } from '../middlewares/validate-middleware';  // Fixed: matches your existing pattern
import { 
    appointmentValidation,
    getAppointmentsQuerySchema 
} from '../utils/validation';  // Fixed: matches your existing pattern
import { Router } from 'express';

const router = Router();

// Patient routes (require patient authentication)
router.post('/book', 
    authenticateToken,  // Fixed: matches your existing function name
    validateBody(appointmentValidation.book), 
    appointmentController.bookAppointment
);

router.get('/patient', 
    authenticateToken,  // Fixed: matches your existing function name
    validateQuery(getAppointmentsQuerySchema),
    appointmentController.getPatientAppointments
);

// Doctor routes (require doctor authentication)
router.get('/doctor', 
    authenticateToken,  // Fixed: matches your existing function name
    validateQuery(getAppointmentsQuerySchema),
    appointmentController.getDoctorAppointments
);

router.put('/complete/:appointmentUniqueId', 
    authenticateToken,  // Fixed: matches your existing function name
    validateParams(appointmentValidation.uniqueIdParam),
    appointmentController.completeAppointment
);

// Both patient and doctor can cancel
router.delete('/cancel/:appointmentUniqueId', 
    authenticateToken,  // Fixed: matches your existing function name
    validateParams(appointmentValidation.uniqueIdParam),
    appointmentController.cancelAppointment
);

// Update appointment (patient only)
router.put('/update/:appointmentUniqueId',
    authenticateToken,  // Fixed: matches your existing function name
    validateParams(appointmentValidation.uniqueIdParam),
    validateBody(appointmentValidation.update),
    appointmentController.updateAppointment
);

export default router;
