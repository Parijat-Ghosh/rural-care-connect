
import { z } from 'zod';

// Auth validation schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be realistic'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password too long')
});

export const loginSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string().min(1, 'Password is required')
});

// Family member validation schemas
export const addFamilyMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be realistic'),
  relation: z.string().min(2, 'Relation must be specified').max(30, 'Relation too long')
});

export const deleteFamilyMemberSchema = z.object({
  memberName: z.string().min(1, 'Member name is required')
});

// Health details validation schema
export const healthDetailsSchema = z.object({
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodGroup: z.string().optional(),
  activeHealthStatus: z.string().optional(),
  appointment: z.string().optional()
}).refine(data => {
  // At least one field should be provided
  return Object.values(data).some(value => value !== undefined && value !== '');
}, {
  message: "At least one health detail field must be provided"
});

// URL parameter validation schemas
export const phoneNumberParamSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')
});

export const memberNameParamSchema = z.object({
  memberName: z.string().min(1, 'Member name is required')
});

export const phoneAndMemberParamSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  memberName: z.string().min(1, 'Member name is required')
});