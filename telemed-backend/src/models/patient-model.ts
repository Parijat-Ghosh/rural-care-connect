
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt = require('bcrypt');

export interface IFamilyMember {
  name: string;
  age: number;
  relation: string;
  height?: string;
  weight?: string;
  bloodGroup?: string;
  activeHealthStatus?: string;
  appointment?: string;
}

export interface IPatient extends Document {
 
  name: string;
  age: number;
  phoneNumber: string; 
  password: string;

  height?: string;
  weight?: string;
  bloodGroup?: string;
  activeHealthStatus?: string;
  appointment?: string;
  
  // Family members array
  familyMembers: IFamilyMember[];
  
  // System fields
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  
  // Instance methods
  comparePassword(password: string): Promise<boolean>;
}

const FamilyMemberSchema = new Schema<IFamilyMember>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  relation: { type: String, required: true },
  height: { type: String, default: '' },
  weight: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  activeHealthStatus: { type: String, default: '' },
  appointment: { type: String, default: '' }
}, { _id: false });

const PatientSchema = new Schema<IPatient>({
  
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  password: { type: String, required: true, minlength: 6 },
  
  // Health details (initially empty)
  height: { type: String, default: '' },
  weight: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  activeHealthStatus: { type: String, default: '' },
  appointment: { type: String, default: '' },
  
  // Family members
  familyMembers: [FamilyMemberSchema],
  
  // System fields
  isDeleted: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Hash password before saving
PatientSchema.pre('save', async function(next) {
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
PatientSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Indexes
PatientSchema.index({ phoneNumber: 1 }, { unique: true });
PatientSchema.index({ name: 1 });
PatientSchema.index({ updatedAt: -1 });

export const PatientModel = mongoose.model<IPatient>('Patient', PatientSchema, 'patientDetails');
export default PatientModel;