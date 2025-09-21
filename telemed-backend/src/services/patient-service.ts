import PatientModel, { IPatient } from '../models/patient-model';
import { Types } from 'mongoose';

export interface CreatePatientDto {
  primaryPhone?: string;
  altPhones?: string[];
  abhaId?: string;
  firstName: string;
  lastName?: string;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  dob?: string; 
  bloodGroup?: string;
  address?: {
    house?: string;
    street?: string;
    village?: string;
    tehsil?: string;
    district?: string;
    state?: string;
    pincode?: string;
  };
  comorbidities?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    relation?: string;
    phone: string;
  };
  consent?: {
    telemedicine?: boolean;
    dataShare?: boolean;
  };
}

export interface FindPatientsQuery {
  q?: string; 
  village?: string;
  limit?: number;
  skip?: number;
}

export const createPatient = async (data: CreatePatientDto): Promise<IPatient> => {
  try {
  
    const patientData: any = { ...data };
    if (data.dob) {
      patientData.dob = new Date(data.dob);
      
      const today = new Date();
      const birthDate = new Date(data.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      patientData.age = age;
    }

  
    patientData.syncVersion = 1;
    patientData.lastSyncedAt = new Date();

    const patient = new PatientModel(patientData);
    const savedPatient = await patient.save();
    
    return savedPatient;
  } catch (error: any) {
    if (error.code === 11000) {
      
      const field = Object.keys(error.keyValue)[0];
      throw new Error(`Patient with this ${field} already exists`);
    }
    throw error;
  }
};

export const findPatientById = async (id: string): Promise<IPatient | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid patient ID format');
    }
    
    const patient = await PatientModel.findOne({ 
      _id: id, 
      isDeleted: { $ne: true } 
    });
    
    return patient;
  } catch (error) {
    throw error;
  }
};

export const findPatients = async (query: FindPatientsQuery) => {
  try {
    const { q, village, limit = 10, skip = 0 } = query;
    
   
    const mongoQuery: any = { isDeleted: { $ne: true } };
    
   
    if (q) {
      mongoQuery.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { primaryPhone: { $regex: q } },
      ];
    }
    
    
    if (village) {
      mongoQuery['address.village'] = { $regex: village, $options: 'i' };
    }
    
   
    const [patients, total] = await Promise.all([
      PatientModel.find(mongoQuery)
        .select('firstName lastName primaryPhone address.village gender age bloodGroup')
        .sort({ updatedAt: -1 })
        .limit(limit)
        .skip(skip),
      PatientModel.countDocuments(mongoQuery)
    ]);
    
    return {
      patients,
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    throw error;
  }
};

export const updatePatient = async (id: string, data: Partial<CreatePatientDto>): Promise<IPatient | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid patient ID format');
    }
    
  
    const updateData: any = { ...data };
    if (data.dob) {
      updateData.dob = new Date(data.dob);
      
      const today = new Date();
      const birthDate = new Date(data.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updateData.age = age;
    }
    
   
    updateData.$inc = { syncVersion: 1 };
    updateData.lastSyncedAt = new Date();
    
    const patient = await PatientModel.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      updateData,
      { new: true, runValidators: true }
    );
    
    return patient;
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      throw new Error(`Patient with this ${field} already exists`);
    }
    throw error;
  }
};

export const softDeletePatient = async (id: string): Promise<IPatient | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid patient ID format');
    }
    
    const patient = await PatientModel.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { 
        isDeleted: true,
        $inc: { syncVersion: 1 },
        lastSyncedAt: new Date()
      },
      { new: true }
    );
    
    return patient;
  } catch (error) {
    throw error;
  }
};