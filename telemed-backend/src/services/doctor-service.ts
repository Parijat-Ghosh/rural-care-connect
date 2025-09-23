

import DoctorModel, { IDoctor } from '../models/doctor-model';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');  
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class DoctorService {
    // Register a new doctor
    async registerDoctor(doctorData: {
        name: string;
        phoneNumber: string;
        specialization: string;
        uniqueId: string;
        password: string;
    }): Promise<{ doctor: Partial<IDoctor>; token: string }> {
        try {
            // Check if doctor already exists
            const existingDoctor = await DoctorModel.findOne({
                $or: [
                    { phoneNumber: doctorData.phoneNumber },
                    { uniqueId: doctorData.uniqueId }
                ]
            });

            if (existingDoctor) {
                throw new Error('Doctor with this phone number or unique ID already exists');
            }

            // Create new doctor
            const newDoctor = new DoctorModel({
                name: doctorData.name,
                phoneNumber: doctorData.phoneNumber,
                specialization: doctorData.specialization,
                uniqueId: doctorData.uniqueId,
                password: doctorData.password
            });

            const savedDoctor = await newDoctor.save();

            // Generate JWT token - ✅ Fixed: Using same pattern as auth-service
            const token = jwt.sign(
                { 
                    doctorId: savedDoctor._id.toString(), 
                    phoneNumber: savedDoctor.phoneNumber, 
                    userType: 'doctor' 
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            // Remove password from response
            const doctorResponse = {
                _id: savedDoctor._id,
                name: savedDoctor.name,
                phoneNumber: savedDoctor.phoneNumber,
                specialization: savedDoctor.specialization,
                uniqueId: savedDoctor.uniqueId,
                availableDatesAndTimes: savedDoctor.availableDatesAndTimes,
                completedAppointments: savedDoctor.completedAppointments,
                upcomingAppointments: savedDoctor.upcomingAppointments,
                createdAt: savedDoctor.createdAt,
                updatedAt: savedDoctor.updatedAt
            };

            return { doctor: doctorResponse, token };
        } catch (error: any) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    // Login doctor
    async loginDoctor(phoneNumber: string, password: string): Promise<{ doctor: Partial<IDoctor>; token: string }> {
        try {
            // Find doctor by phone number
            const doctor = await DoctorModel.findOne({ phoneNumber, isDeleted: false });
            
            if (!doctor) {
                throw new Error('Doctor not found');
            }

            // Check password
            const isValidPassword = await doctor.comparePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token - ✅ Fixed: Using same pattern as auth-service
            const token = jwt.sign(
                { 
                    doctorId: doctor._id.toString(), 
                    phoneNumber: doctor.phoneNumber, 
                    userType: 'doctor' 
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            // Remove password from response
            const doctorResponse = {
                _id: doctor._id,
                name: doctor.name,
                phoneNumber: doctor.phoneNumber,
                specialization: doctor.specialization,
                uniqueId: doctor.uniqueId,
                availableDatesAndTimes: doctor.availableDatesAndTimes,
                completedAppointments: doctor.completedAppointments,
                upcomingAppointments: doctor.upcomingAppointments,
                createdAt: doctor.createdAt,
                updatedAt: doctor.updatedAt
            };

            return { doctor: doctorResponse, token };
        } catch (error: any) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    // Get doctor profile
    async getDoctorProfile(doctorId: string): Promise<Partial<IDoctor>> {
        try {
            const doctor = await DoctorModel.findById(doctorId).select('-password');
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            return doctor;
        } catch (error: any) {
            throw new Error(`Failed to get profile: ${error.message}`);
        }
    }

    // Update doctor profile
    async updateDoctorProfile(doctorId: string, updateData: Partial<IDoctor>): Promise<Partial<IDoctor>> {
        try {
            const updatedDoctor = await DoctorModel.findByIdAndUpdate(
                doctorId,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedDoctor) {
                throw new Error('Doctor not found');
            }

            return updatedDoctor;
        } catch (error: any) {
            throw new Error(`Profile update failed: ${error.message}`);
        }
    }

    // Get all doctors (for patient to see available doctors)
    async getAllDoctors(): Promise<Partial<IDoctor>[]> {
        try {
            const doctors = await DoctorModel.find({ isDeleted: false })
                .select('-password -completedAppointments -upcomingAppointments')
                .sort({ createdAt: -1 });
            return doctors;
        } catch (error: any) {
            throw new Error(`Failed to get doctors: ${error.message}`);
        }
    }
}

export default new DoctorService();
