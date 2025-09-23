// src/services/auth-service.ts (Ultra-Simple Version)
const jwt = require('jsonwebtoken');
import PatientModel, { IPatient } from '../models/patient-model';

export interface SignupData {
  name: string;
  age: number;
  phoneNumber: string;
  password: string;
}

export interface LoginData {
  phoneNumber: string;
  password: string;
}

export const signup = async (data: SignupData): Promise<{ patient: IPatient; token: string }> => {
  try {
    // Check if patient already exists
    const existingPatient = await PatientModel.findOne({ phoneNumber: data.phoneNumber });
    if (existingPatient) {
      throw new Error('Patient with this phone number already exists');
    }

    // Create new patient with empty health details
    const patient = new PatientModel({
      name: data.name,
      age: data.age,
      phoneNumber: data.phoneNumber,
      password: data.password,
      height: '',
      weight: '',
      bloodGroup: '',
      activeHealthStatus: '',
      appointment: '',
      familyMembers: []
    });

    await patient.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: patient._id.toString(), phoneNumber: patient.phoneNumber },
      'my-simple-secret-key-123',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const patientResponse = patient.toObject();
    delete patientResponse.password;

    return { patient: patientResponse as IPatient, token };
  } catch (error: any) {
    throw error;
  }
  
};

export const login = async (data: LoginData): Promise<{ patient: IPatient; token: string }> => {
  try {
    // Find patient by phone number
    const patient = await PatientModel.findOne({ 
      phoneNumber: data.phoneNumber,
      isDeleted: { $ne: true }
    });

    if (!patient) {
      throw new Error('Invalid phone number or password');
    }

    // Check password
    const isPasswordValid = await patient.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new Error('Invalid phone number or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: patient._id.toString(), phoneNumber: patient.phoneNumber },
      'my-simple-secret-key-123',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const patientResponse = patient.toObject();
    delete patientResponse.password;

    return { patient: patientResponse as IPatient, token };
  } catch (error: any) {
    throw error;
  }

};

export const verifyToken = (token: string): { userId: string; phoneNumber: string } => {
  try {
    const decoded: any = jwt.verify(token,'my-simple-secret-key-123');
    return { userId: decoded.userId, phoneNumber: decoded.phoneNumber };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};