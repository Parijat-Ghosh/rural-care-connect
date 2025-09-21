
import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
  house?: string;
  street?: string;
  village?: string;
  tehsil?: string;
  district?: string;
  state?: string;
  pincode?: string;
}

export interface IEmergencyContact {
  name: string;
  relation?: string;
  phone: string;
}

export interface IPatient extends Document {
  primaryPhone?: string;
  altPhones?: string[];
  abhaId?: string | null;
  firstName: string;
  lastName?: string;
  gender?: 'male'|'female'|'other'|'unknown';
  dob?: Date;
  age?: number; 
  bloodGroup?: string;
  address?: IAddress;
  comorbidities?: string[];
  allergies?: string[];
  emergencyContact?: IEmergencyContact;
  consent?: { telemedicine?: boolean; dataShare?: boolean };
  syncVersion?: number; 
  lastSyncedAt?: Date;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AddressSchema = new Schema<IAddress>({
  house: { type: String },
  street: { type: String },
  village: { type: String, index: true },
  tehsil: String,
  district: String,
  state: String,
  pincode: String,
}, { _id: false });

const EmergencySchema = new Schema<IEmergencyContact>({
  name: { type: String, required: false },
  relation: String,
  phone: String,
}, { _id: false });

const PatientSchema = new Schema<IPatient>({
  primaryPhone: { type: String, trim: true, sparse: true },
  altPhones: [{ type: String }],
  abhaId: { type: String, index: true, sparse: true },
  firstName: { type: String, required: true, index: true },
  lastName: String,
  gender: { type: String, enum: ['male','female','other','unknown'], default: 'unknown' },
  dob: Date,
  age: Number,
  bloodGroup: String,
  address: AddressSchema,
  comorbidities: [String],
  allergies: [String],
  emergencyContact: EmergencySchema,
  consent: {
    telemedicine: { type: Boolean, default: false },
    dataShare: { type: Boolean, default: false },
  },
  syncVersion: { type: Number, default: 1 },
  lastSyncedAt: Date,
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });




PatientSchema.index({ primaryPhone: 1 }, { unique: true, sparse: true });
PatientSchema.index({ 'address.village': 1 });
PatientSchema.index({ updatedAt: -1 });


export const PatientModel = mongoose.model<IPatient>('Patient', PatientSchema, 'patientDetails');
export default PatientModel;