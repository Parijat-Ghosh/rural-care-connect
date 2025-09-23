import AppointmentModel, { IAppointment } from '../models/appointment-model';
import DoctorModel from '../models/doctor-model';
import PatientModel from '../models/patient-model';
import { v4 as uuidv4 } from 'uuid';

export class AppointmentService {
    // Book appointment (by patient)
    async bookAppointment(appointmentData: {
        patientNumber: string;
        doctorUniqueId: string;
        diseaseOrHealthIssue: string;
        appointmentDate: Date;
        appointmentTime: string;
    }): Promise<IAppointment> {
        try {
            // Find patient
            const patient = await PatientModel.findOne({ 
                phoneNumber: appointmentData.patientNumber, 
                isDeleted: false 
            });
            if (!patient) {
                throw new Error('Patient not found');
            }

            // Find doctor
            const doctor = await DoctorModel.findOne({ 
                uniqueId: appointmentData.doctorUniqueId, 
                isDeleted: false 
            });
            if (!doctor) {
                throw new Error('Doctor not found');
            }

            // Generate unique appointment ID
            const appointmentUniqueId = uuidv4();

            // Create appointment
            const newAppointment = new AppointmentModel({
                patientName: patient.name,
                patientNumber: appointmentData.patientNumber,
                doctorName: doctor.name,
                doctorUniqueId: appointmentData.doctorUniqueId,
                diseaseOrHealthIssue: appointmentData.diseaseOrHealthIssue,
                appointmentDate: appointmentData.appointmentDate,
                appointmentTime: appointmentData.appointmentTime,
                appointmentUniqueId: appointmentUniqueId
            });

            const savedAppointment = await newAppointment.save();

            // Update patient's appointments
            await PatientModel.findByIdAndUpdate(patient._id, {
                $set: { appointment: appointmentUniqueId }
            });

            // Update doctor's upcoming appointments
            await DoctorModel.findByIdAndUpdate(doctor._id, {
                $push: { upcomingAppointments: appointmentUniqueId }
            });

            return savedAppointment;
        } catch (error: any) {
            throw new Error(`Booking failed: ${error.message}`);
        }
    }

    // Get patient appointments
    async getPatientAppointments(patientNumber: string): Promise<IAppointment[]> {
        try {
            const appointments = await AppointmentModel.find({
                patientNumber: patientNumber,
                isDeleted: false
            }).sort({ appointmentDate: 1 });

            return appointments;
        } catch (error: any) {
            throw new Error(`Failed to get patient appointments: ${error.message}`);
        }
    }

    // Get doctor appointments
    async getDoctorAppointments(doctorUniqueId: string): Promise<IAppointment[]> {
        try {
            const appointments = await AppointmentModel.find({
                doctorUniqueId: doctorUniqueId,
                isDeleted: false
            }).sort({ appointmentDate: 1 });

            return appointments;
        } catch (error: any) {
            throw new Error(`Failed to get doctor appointments: ${error.message}`);
        }
    }

    // Update appointment (by patient)
async updateAppointment(appointmentUniqueId: string, updateData: {
    diseaseOrHealthIssue?: string;
    appointmentDate?: Date;
    appointmentTime?: string;
}): Promise<IAppointment> {
    try {
        const appointment = await AppointmentModel.findOne({ 
            appointmentUniqueId,
            isDeleted: false 
        });
        
        if (!appointment) {
            throw new Error('Appointment not found');
        }

        // Update the appointment with new data
        const updatedAppointment = await AppointmentModel.findOneAndUpdate(
            { appointmentUniqueId },
            { 
                ...updateData,
                appointmentDate: updateData.appointmentDate ? new Date(updateData.appointmentDate) : appointment.appointmentDate,
                updatedAt: new Date() 
            },
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            throw new Error('Failed to update appointment');
        }

        return updatedAppointment;
    } catch (error: any) {
        throw new Error(`Failed to update appointment: ${error.message}`);
    }
}


    // Cancel appointment
    async cancelAppointment(appointmentUniqueId: string): Promise<boolean> {
        try {
            const appointment = await AppointmentModel.findOne({ appointmentUniqueId });
            if (!appointment) {
                throw new Error('Appointment not found');
            }

            // Mark appointment as deleted
            await AppointmentModel.findByIdAndUpdate(appointment._id, {
                isDeleted: true
            });

            // Remove from patient's appointment
            await PatientModel.findOneAndUpdate(
                { phoneNumber: appointment.patientNumber },
                { $unset: { appointment: '' } }
            );

            // Remove from doctor's upcoming appointments
            await DoctorModel.findOneAndUpdate(
                { uniqueId: appointment.doctorUniqueId },
                { $pull: { upcomingAppointments: appointmentUniqueId } }
            );

            return true;
        } catch (error: any) {
            throw new Error(`Failed to cancel appointment: ${error.message}`);
        }
    }

    // Complete appointment (move to completed)
    async completeAppointment(appointmentUniqueId: string): Promise<boolean> {
        try {
            const appointment = await AppointmentModel.findOne({ appointmentUniqueId });
            if (!appointment) {
                throw new Error('Appointment not found');
            }

            // Remove from doctor's upcoming and add to completed
            await DoctorModel.findOneAndUpdate(
                { uniqueId: appointment.doctorUniqueId },
                {
                    $pull: { upcomingAppointments: appointmentUniqueId },
                    $push: { completedAppointments: appointmentUniqueId }
                }
            );

            return true;
        } catch (error: any) {
            throw new Error(`Failed to complete appointment: ${error.message}`);
        }
    }
}

export default new AppointmentService();
