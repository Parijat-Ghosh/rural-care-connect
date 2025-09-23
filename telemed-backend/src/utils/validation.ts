
// import { z } from 'zod';

// // Auth validation schemas
// export const signupSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
//   age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be realistic'),
//   phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
//   password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password too long')
// });

// export const loginSchema = z.object({
//   phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
//   password: z.string().min(1, 'Password is required')
// });

// // Family member validation schemas
// export const addFamilyMemberSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
//   age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be realistic'),
//   relation: z.string().min(2, 'Relation must be specified').max(30, 'Relation too long')
// });

// export const deleteFamilyMemberSchema = z.object({
//   memberName: z.string().min(1, 'Member name is required')
// });

// // Health details validation schema
// export const healthDetailsSchema = z.object({
//   height: z.string().optional(),
//   weight: z.string().optional(),
//   bloodGroup: z.string().optional(),
//   activeHealthStatus: z.string().optional(),
//   appointment: z.string().optional()
// }).refine(data => {
//   // At least one field should be provided
//   return Object.values(data).some(value => value !== undefined && value !== '');
// }, {
//   message: "At least one health detail field must be provided"
// });

// // URL parameter validation schemas
// export const phoneNumberParamSchema = z.object({
//   phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')
// });

// export const memberNameParamSchema = z.object({
//   memberName: z.string().min(1, 'Member name is required')
// });

// export const phoneAndMemberParamSchema = z.object({
//   phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
//   memberName: z.string().min(1, 'Member name is required')
// });

import { z } from 'zod';

// =======================================
// PATIENT AUTH VALIDATION SCHEMAS
// =======================================

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

// =======================================
// FAMILY MEMBER VALIDATION SCHEMAS
// =======================================

export const addFamilyMemberSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
    age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be realistic'),
    relation: z.string().min(2, 'Relation must be specified').max(30, 'Relation too long')
});

export const deleteFamilyMemberSchema = z.object({
    memberName: z.string().min(1, 'Member name is required')
});

// =======================================
// HEALTH DETAILS VALIDATION SCHEMA
// =======================================

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

// =======================================
// DOCTOR VALIDATION SCHEMAS
// =======================================

// Doctor signup validation schema
export const doctorSignupSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .trim(),
    phoneNumber: z.string()
        .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .trim(),
    specialization: z.string()
        .min(2, 'Specialization must be at least 2 characters')
        .max(100, 'Specialization must be less than 100 characters')
        .trim(),
    uniqueId: z.string()
        .min(3, 'Unique ID must be at least 3 characters')
        .max(50, 'Unique ID must be less than 50 characters')
        .trim()
        .regex(/^[a-zA-Z0-9_-]+$/, 'Unique ID can only contain letters, numbers, hyphens, and underscores'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be less than 100 characters')
});

// Doctor login validation schema
export const doctorLoginSchema = z.object({
    phoneNumber: z.string()
        .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .trim(),
    password: z.string()
        .min(1, 'Password is required')
});

// Doctor profile update validation schema
export const doctorProfileUpdateSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .trim()
        .optional(),
    specialization: z.string()
        .min(2, 'Specialization must be at least 2 characters')
        .max(100, 'Specialization must be less than 100 characters')
        .trim()
        .optional(),
    availableDatesAndTimes: z.string()
        .max(1000, 'Available dates and times must be less than 1000 characters')
        .optional()
}).refine(data => {
    // At least one field should be provided for update
    return Object.values(data).some(value => value !== undefined && value !== '');
}, {
    message: "At least one field must be provided for update"
});

// =======================================
// APPOINTMENT VALIDATION SCHEMAS
// =======================================

// Book appointment validation schema
export const bookAppointmentSchema = z.object({
    doctorUniqueId: z.string()
        .min(3, 'Doctor unique ID must be at least 3 characters')
        .max(50, 'Doctor unique ID must be less than 50 characters')
        .trim(),
    diseaseOrHealthIssue: z.string()
        .min(5, 'Disease/health issue description must be at least 5 characters')
        .max(500, 'Disease/health issue description must be less than 500 characters')
        .trim(),
    appointmentDate: z.string()
        .datetime('Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)')
        .refine((date) => {
            const appointmentDate = new Date(date);
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            // Appointment must be at least tomorrow
            return appointmentDate >= tomorrow;
        }, {
            message: "Appointment date must be at least tomorrow"
        }),
    appointmentTime: z.string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format (24-hour)')
        .refine((time) => {
            const [hours, minutes] = time.split(':').map(Number);
            // Check for reasonable appointment hours (e.g., 8 AM to 8 PM)
            return hours >= 8 && hours <= 20;
        }, {
            message: "Appointment time must be between 08:00 and 20:00"
        })
});

// Update appointment validation schema
export const updateAppointmentSchema = z.object({
    diseaseOrHealthIssue: z.string()
        .min(5, 'Disease/health issue description must be at least 5 characters')
        .max(500, 'Disease/health issue description must be less than 500 characters')
        .trim()
        .optional(),
    appointmentDate: z.string()
        .datetime('Invalid date format. Use ISO 8601 format')
        .refine((date) => {
            const appointmentDate = new Date(date);
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            return appointmentDate >= tomorrow;
        }, {
            message: "Appointment date must be at least tomorrow"
        })
        .optional(),
    appointmentTime: z.string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format (24-hour)')
        .refine((time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours >= 8 && hours <= 20;
        }, {
            message: "Appointment time must be between 08:00 and 20:00"
        })
        .optional()
}).refine(data => {
    // At least one field should be provided for update
    return Object.values(data).some(value => value !== undefined && value !== '');
}, {
    message: "At least one field must be provided for update"
});

// =======================================
// URL PARAMETER VALIDATION SCHEMAS
// =======================================

// Patient-related parameter schemas
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

// Doctor-related parameter schemas
export const doctorUniqueIdParamSchema = z.object({
    uniqueId: z.string()
        .min(3, 'Doctor unique ID must be at least 3 characters')
        .max(50, 'Doctor unique ID must be less than 50 characters')
        .trim()
});

// Appointment-related parameter schemas
export const appointmentUniqueIdParamSchema = z.object({
    appointmentUniqueId: z.string()
        .uuid('Invalid appointment ID format')
});

// =======================================
// QUERY PARAMETER VALIDATION SCHEMAS
// =======================================

// Get appointments query parameters
export const getAppointmentsQuerySchema = z.object({
    status: z.enum(['upcoming', 'completed', 'all'], {
        errorMap: () => ({ message: "Status must be 'upcoming', 'completed', or 'all'" })
    }).optional(),
    page: z.string()
        .regex(/^\d+$/, 'Page must be a positive number')
        .transform(Number)
        .refine(num => num > 0, 'Page must be greater than 0')
        .optional(),
    limit: z.string()
        .regex(/^\d+$/, 'Limit must be a positive number')
        .transform(Number)
        .refine(num => num > 0 && num <= 100, 'Limit must be between 1 and 100')
        .optional(),
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .optional()
});

// Search doctors query parameters
export const searchDoctorsQuerySchema = z.object({
    specialization: z.string()
        .min(1, 'Specialization cannot be empty')
        .max(100, 'Specialization must be less than 100 characters')
        .trim()
        .optional(),
    name: z.string()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name must be less than 100 characters')
        .trim()
        .optional(),
    page: z.string()
        .regex(/^\d+$/, 'Page must be a positive number')
        .transform(Number)
        .refine(num => num > 0, 'Page must be greater than 0')
        .optional(),
    limit: z.string()
        .regex(/^\d+$/, 'Limit must be a positive number')
        .transform(Number)
        .refine(num => num > 0 && num <= 50, 'Limit must be between 1 and 50')
        .optional()
});

// =======================================
// COMBINED VALIDATION OBJECTS FOR EASY IMPORT
// =======================================

export const patientValidation = {
    signup: signupSchema,
    login: loginSchema,
    addFamilyMember: addFamilyMemberSchema,
    deleteFamilyMember: deleteFamilyMemberSchema,
    healthDetails: healthDetailsSchema,
    phoneNumberParam: phoneNumberParamSchema,
    memberNameParam: memberNameParamSchema,
    phoneAndMemberParam: phoneAndMemberParamSchema
};

export const doctorValidation = {
    signup: doctorSignupSchema,
    login: doctorLoginSchema,
    profileUpdate: doctorProfileUpdateSchema,
    uniqueIdParam: doctorUniqueIdParamSchema,
    searchQuery: searchDoctorsQuerySchema
};

export const appointmentValidation = {
    book: bookAppointmentSchema,
    update: updateAppointmentSchema,
    uniqueIdParam: appointmentUniqueIdParamSchema,
    query: getAppointmentsQuerySchema
};
