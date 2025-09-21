import { z } from 'zod';

export const phoneSchema = z.string().min(6);

export const addressSchema = z.object({
  house: z.string().optional(),
  street: z.string().optional(),
  village: z.string().optional(),
  tehsil: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

export const createPatientSchema = z.object({
  primaryPhone: phoneSchema.optional(),
  altPhones: z.array(phoneSchema).optional(),
  abhaId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  gender: z.enum(['male','female','other','unknown']).optional(),
  dob: z.string().optional(), 
  bloodGroup: z.string().optional(),
  address: addressSchema.optional(),
  comorbidities: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  emergencyContact: z.object({
    name: z.string(),
    relation: z.string().optional(),
    phone: phoneSchema,
  }).optional(),
  consent: z.object({
    telemedicine: z.boolean().optional(),
    dataShare: z.boolean().optional(),
  }).optional()
});

export const updatePatientSchema = createPatientSchema.partial();
