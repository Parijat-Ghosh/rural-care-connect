
import PatientModel, { IPatient, IFamilyMember } from '../models/patient-model';
import { Types } from 'mongoose';

export interface AddFamilyMemberData {
  name: string;
  age: number;
  relation: string;
}

export interface UpdateHealthDetailsData {
  height?: string;
  weight?: string;
  bloodGroup?: string;
  activeHealthStatus?: string;
  appointment?: string;
}

// Get patient by phone number (for main patient)
export const getPatientByPhone = async (phoneNumber: string): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findOne({ 
      phoneNumber, 
      isDeleted: { $ne: true } 
    }).select('-password');
    
    return patient;
  } catch (error) {
    throw error;
  }
};

// Add family member to patient
export const addFamilyMember = async (
  phoneNumber: string, 
  familyMemberData: AddFamilyMemberData
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findOne({ 
      phoneNumber, 
      isDeleted: { $ne: true } 
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    // Check if family member with same name already exists
    const existingMember = patient.familyMembers.find(
      member => member.name.toLowerCase() === familyMemberData.name.toLowerCase()
    );

    if (existingMember) {
      throw new Error('Family member with this name already exists');
    }

    // Add family member with empty health details
    const newFamilyMember: IFamilyMember = {
      name: familyMemberData.name,
      age: familyMemberData.age,
      relation: familyMemberData.relation,
      height: '',
      weight: '',
      bloodGroup: '',
      activeHealthStatus: '',
      appointment: ''
    };

    patient.familyMembers.push(newFamilyMember);
    await patient.save();

    // Return patient without password
    const updatedPatient = await PatientModel.findOne({ phoneNumber }).select('-password');
    return updatedPatient;
  } catch (error: any) {
    throw error;
  }
};

// Delete family member
export const deleteFamilyMember = async (
  phoneNumber: string,
  memberName: string
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findOne({ 
      phoneNumber, 
      isDeleted: { $ne: true } 
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    // Find and remove family member
    const memberIndex = patient.familyMembers.findIndex(
      member => member.name.toLowerCase() === memberName.toLowerCase()
    );

    if (memberIndex === -1) {
      throw new Error('Family member not found');
    }

    patient.familyMembers.splice(memberIndex, 1);
    await patient.save();

    // Return updated patient without password
    const updatedPatient = await PatientModel.findOne({ phoneNumber }).select('-password');
    return updatedPatient;
  } catch (error: any) {
    throw error;
  }
};

// Update main patient health details
export const updateMainPatientHealth = async (
  phoneNumber: string,
  healthData: UpdateHealthDetailsData
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findOneAndUpdate(
      { phoneNumber, isDeleted: { $ne: true } },
      { $set: healthData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  } catch (error: any) {
    throw error;
  }
};

// Update family member health details
export const updateFamilyMemberHealth = async (
  phoneNumber: string,
  memberName: string,
  healthData: UpdateHealthDetailsData
): Promise<IPatient | null> => {
  try {
    const patient = await PatientModel.findOne({ 
      phoneNumber, 
      isDeleted: { $ne: true } 
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    // Find family member
    const memberIndex = patient.familyMembers.findIndex(
      member => member.name.toLowerCase() === memberName.toLowerCase()
    );

    if (memberIndex === -1) {
      throw new Error('Family member not found');
    }

    // Update family member health details
    Object.keys(healthData).forEach(key => {
      if (healthData[key as keyof UpdateHealthDetailsData] !== undefined) {
        (patient.familyMembers[memberIndex] as any)[key] = healthData[key as keyof UpdateHealthDetailsData];
      }
    });

    await patient.save();

    // Return updated patient without password
    const updatedPatient = await PatientModel.findOne({ phoneNumber }).select('-password');
    return updatedPatient;
  } catch (error: any) {
    throw error;
  }
};

// Get all family members for a patient
export const getFamilyMembers = async (phoneNumber: string): Promise<IFamilyMember[]> => {
  try {
    const patient = await PatientModel.findOne({ 
      phoneNumber, 
      isDeleted: { $ne: true } 
    }).select('familyMembers');

    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient.familyMembers;
  } catch (error: any) {
    throw error;
  }
};

// Get specific family member details
export const getFamilyMemberByName = async (
  phoneNumber: string, 
  memberName: string
): Promise<IFamilyMember | null> => {
  try {
    const patient = await PatientModel.findOne({ 
      phoneNumber, 
      isDeleted: { $ne: true } 
    }).select('familyMembers');

    if (!patient) {
      throw new Error('Patient not found');
    }

    const familyMember = patient.familyMembers.find(
      member => member.name.toLowerCase() === memberName.toLowerCase()
    );

    if (!familyMember) {
      throw new Error('Family member not found');
    }

    return familyMember;
  } catch (error: any) {
    throw error;
  }
};