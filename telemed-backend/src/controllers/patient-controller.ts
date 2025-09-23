
import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth-service';
import * as patientService from '../services/patient-service';



export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patient, token } = await authService.signup(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      data: {
        patient,
        token
      }
    });
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patient, token } = await authService.login(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        patient,
        token
      }
    });
  } catch (error: any) {
    if (error.message.includes('Invalid')) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};



export const getPatientProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const patient = await patientService.getPatientByPhone(phoneNumber);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

export const updateMainPatientHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const patient = await patientService.updateMainPatientHealth(phoneNumber, req.body);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Health details updated successfully',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};



export const addFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const patient = await patientService.addFamilyMember(phoneNumber, req.body);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Family member added successfully',
      data: patient
    });
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

export const deleteFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const { memberName } = req.params;
    
    const patient = await patientService.deleteFamilyMember(phoneNumber, memberName);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Family member deleted successfully',
      data: patient
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
};

export const getFamilyMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const familyMembers = await patientService.getFamilyMembers(phoneNumber);
    
    res.status(200).json({
      success: true,
      count: familyMembers.length,
      data: familyMembers
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
};

export const getFamilyMemberDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const { memberName } = req.params;
    
    const familyMember = await patientService.getFamilyMemberByName(phoneNumber, memberName);
    
    if (!familyMember) {
      return res.status(404).json({
        success: false,
        message: 'Family member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: familyMember
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
};

export const updateFamilyMemberHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.user!.phoneNumber;
    const { memberName } = req.params;
    
    const patient = await patientService.updateFamilyMemberHealth(phoneNumber, memberName, req.body);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient or family member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Family member health details updated successfully',
      data: patient
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
};