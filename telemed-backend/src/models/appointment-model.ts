import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    patientName: string;
    patientNumber: string;
    doctorName: string;
    doctorUniqueId: string;
    diseaseOrHealthIssue: string;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentUniqueId: string;
    
    // System fields
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}

const AppointmentSchema = new Schema<IAppointment>({
    patientName: { type: String, required: true, trim: true },
    patientNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    doctorName: { type: String, required: true, trim: true },
    doctorUniqueId: {
        type: String,
        required: true,
        trim: true
    },
    diseaseOrHealthIssue: { type: String, required: true, trim: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    appointmentUniqueId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    // System fields
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Indexes
AppointmentSchema.index({ patientNumber: 1 });
AppointmentSchema.index({ doctorUniqueId: 1 });
AppointmentSchema.index({ appointmentUniqueId: 1 }, { unique: true });
AppointmentSchema.index({ appointmentDate: 1 });
AppointmentSchema.index({ updatedAt: -1 });

export const AppointmentModel = mongoose.model<IAppointment>('Appointment', AppointmentSchema, 'appointmentDetails');
export default AppointmentModel;
