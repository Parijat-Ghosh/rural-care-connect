import mongoose, { Schema, Document } from 'mongoose';
const bcrypt = require('bcrypt');

export interface IDoctor extends Document {
    name: string;
    phoneNumber: string;
    specialization: string;
    uniqueId: string;
    password: string;
    availableDatesAndTimes: string;
    completedAppointments: string[];
    upcomingAppointments: string[];
    
    // System fields
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    
    // Instance methods
    comparePassword(password: string): Promise<boolean>;
}

const DoctorSchema = new Schema<IDoctor>({
    name: { type: String, required: true, trim: true },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    specialization: { type: String, required: true, trim: true },
    uniqueId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { type: String, required: true, minlength: 6 },
    
    // Initially empty fields
    availableDatesAndTimes: { type: String, default: '' },
    completedAppointments: { type: [String], default: [] },
    upcomingAppointments: { type: [String], default: [] },
    
    // System fields
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Hash password before saving
DoctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Compare password method
DoctorSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Indexes
DoctorSchema.index({ phoneNumber: 1 }, { unique: true });
DoctorSchema.index({ uniqueId: 1 }, { unique: true });
DoctorSchema.index({ name: 1 });
DoctorSchema.index({ specialization: 1 });
DoctorSchema.index({ updatedAt: -1 });

export const DoctorModel = mongoose.model<IDoctor>('Doctor', DoctorSchema, 'doctorDetails');
export default DoctorModel;
