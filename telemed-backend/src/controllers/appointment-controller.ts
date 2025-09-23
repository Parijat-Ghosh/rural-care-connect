// import { Request, Response } from 'express';
// import appointmentService from '../services/appointment-service';

// export class AppointmentController {
//     // Book appointment (by patient)
//     async bookAppointment(req: Request, res: Response): Promise<void> {
//         try {
//             const patientNumber = (req as any).patient.phoneNumber;
//             const { doctorUniqueId, diseaseOrHealthIssue, appointmentDate, appointmentTime } = req.body;

//             const appointment = await appointmentService.bookAppointment({
//                 patientNumber,
//                 doctorUniqueId,
//                 diseaseOrHealthIssue,
//                 appointmentDate: new Date(appointmentDate),
//                 appointmentTime
//             });

//             res.status(201).json({
//                 success: true,
//                 message: 'Appointment booked successfully',
//                 data: { appointment }
//             });
//         } catch (error: any) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     // Get patient appointments
//     async getPatientAppointments(req: Request, res: Response): Promise<void> {
//         try {
//             const patientNumber = (req as any).patient.phoneNumber;
//             const appointments = await appointmentService.getPatientAppointments(patientNumber);

//             res.status(200).json({
//                 success: true,
//                 data: { appointments }
//             });
//         } catch (error: any) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     // Get doctor appointments
//     async getDoctorAppointments(req: Request, res: Response): Promise<void> {
//         try {
//             const doctorUniqueId = (req as any).doctor.uniqueId;
//             const appointments = await appointmentService.getDoctorAppointments(doctorUniqueId);

//             res.status(200).json({
//                 success: true,
//                 data: { appointments }
//             });
//         } catch (error: any) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     // Cancel appointment
//     async cancelAppointment(req: Request, res: Response): Promise<void> {
//         try {
//             const { appointmentUniqueId } = req.params;
//             await appointmentService.cancelAppointment(appointmentUniqueId);

//             res.status(200).json({
//                 success: true,
//                 message: 'Appointment cancelled successfully'
//             });
//         } catch (error: any) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     // Complete appointment (by doctor)
//     async completeAppointment(req: Request, res: Response): Promise<void> {
//         try {
//             const { appointmentUniqueId } = req.params;
//             await appointmentService.completeAppointment(appointmentUniqueId);

//             res.status(200).json({
//                 success: true,
//                 message: 'Appointment completed successfully'
//             });
//         } catch (error: any) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// }

// export default new AppointmentController();


import { Request, Response, NextFunction } from 'express';
import appointmentService from '../services/appointment-service';

export class AppointmentController {
    // Book appointment (by patient)
    async bookAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const patientNumber = (req as any).user.phoneNumber; // Using same pattern as patient-controller
            const { doctorUniqueId, diseaseOrHealthIssue, appointmentDate, appointmentTime } = req.body;

            const appointment = await appointmentService.bookAppointment({
                patientNumber,
                doctorUniqueId,
                diseaseOrHealthIssue,
                appointmentDate: new Date(appointmentDate),
                appointmentTime
            });

            res.status(201).json({
                success: true,
                message: 'Appointment booked successfully',
                data: appointment
            });
        } catch (error: any) {
            if (error.message.includes('not found')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }

    // Get patient appointments
    async getPatientAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const patientNumber = (req as any).user.phoneNumber; // Using same pattern as patient-controller
            const appointments = await appointmentService.getPatientAppointments(patientNumber);

            res.status(200).json({
                success: true,
                count: appointments.length,
                data: appointments
            });
        } catch (error: any) {
            if (error.message.includes('not found')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }

    // Get doctor appointments
    async getDoctorAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const doctorUniqueId = (req as any).user.doctorId; // Need to modify auth middleware to support this
            const appointments = await appointmentService.getDoctorAppointments(doctorUniqueId);

            res.status(200).json({
                success: true,
                count: appointments.length,
                data: appointments
            });
        } catch (error: any) {
            if (error.message.includes('not found')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }

    // Cancel appointment
    async cancelAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { appointmentUniqueId } = req.params;
            await appointmentService.cancelAppointment(appointmentUniqueId);

            res.status(200).json({
                success: true,
                message: 'Appointment cancelled successfully'
            });
        } catch (error: any) {
            if (error.message.includes('not found')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }

    // Complete appointment (by doctor)
    async completeAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { appointmentUniqueId } = req.params;
            await appointmentService.completeAppointment(appointmentUniqueId);

            res.status(200).json({
                success: true,
                message: 'Appointment completed successfully'
            });
        } catch (error: any) {
            if (error.message.includes('not found')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }

    // Update appointment (by patient)
    async updateAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { appointmentUniqueId } = req.params;
            const updateData = req.body;

            const updatedAppointment = await appointmentService.updateAppointment(appointmentUniqueId, updateData);

            res.status(200).json({
                success: true,
                message: 'Appointment updated successfully',
                data: updatedAppointment
            });
        } catch (error: any) {
            if (error.message.includes('not found')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            next(error);
        }
    }
}

// Export as default using the same pattern as patient-controller
const appointmentController = new AppointmentController();
export default appointmentController;
