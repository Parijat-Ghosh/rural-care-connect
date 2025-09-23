import { Request, Response } from 'express';
import doctorService from '../services/doctor-service';

export class DoctorController {
    // Register doctor
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, phoneNumber, specialization, uniqueId, password } = req.body;

            const result = await doctorService.registerDoctor({
                name,
                phoneNumber,
                specialization,
                uniqueId,
                password
            });

            res.status(201).json({
                success: true,
                message: 'Doctor registered successfully',
                data: {
                    doctor: result.doctor,
                    token: result.token
                }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Login doctor
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { phoneNumber, password } = req.body;

            const result = await doctorService.loginDoctor(phoneNumber, password);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    doctor: result.doctor,
                    token: result.token
                }
            });
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get profile
    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const doctorId = (req as any).doctor.doctorId;
            const doctor = await doctorService.getDoctorProfile(doctorId);

            res.status(200).json({
                success: true,
                data: { doctor }
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update profile
    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const doctorId = (req as any).doctor.doctorId;
            const updateData = req.body;

            const updatedDoctor = await doctorService.updateDoctorProfile(doctorId, updateData);

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: { doctor: updatedDoctor }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get all doctors
    async getAllDoctors(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await doctorService.getAllDoctors();

            res.status(200).json({
                success: true,
                data: { doctors }
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new DoctorController();
