import { z } from 'zod'

/**
 * Validation schemas using Zod
 * These ensure data is properly formatted before saving to database
 */

// Email validation
export const emailSchema = z.string().email('Invalid email address')

// Password validation (min 8 chars, at least one letter and one number)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

// Phone validation (basic international format)
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')

// Talent registration validation
export const talentRegistrationSchema = z.object({
  userType: z.literal('talent'),
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: phoneSchema,
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  dateOfBirth: z.string().optional(),
  title: z.string().min(2, 'Professional title is required'),
  bio: z.string().optional(),
  experience: z.enum(['Junior', 'Mid-level', 'Senior', 'Expert']).optional(),
  hourlyRate: z.string().optional(),
  availability: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance']).optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  languages: z.array(z.object({
    language: z.string(),
    proficiency: z.enum(['Native', 'Fluent', 'Intermediate', 'Basic']),
  })).min(1, 'At least one language is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
})

// Organization registration validation
export const organizationRegistrationSchema = z.object({
  userType: z.literal('organization'),
  email: emailSchema,
  password: passwordSchema,
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
  industry: z.string().min(2, 'Industry is required'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  phone: phoneSchema.optional().or(z.literal('')),
})

// Login validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  userType: z.enum(['talent', 'organization'], {
    required_error: 'User type is required',
  }),
})

// Job creation validation
export const jobCreationSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  description: z.string().min(50, 'Job description must be at least 50 characters'),
  category: z.string().min(2, 'Category is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance']),
  location: z.string().min(2, 'Location is required'),
  country: z.string().min(2, 'Country is required'),
  remote: z.boolean().optional(),
  requiredSkills: z.array(z.string()).optional(),
  experience: z.enum(['Junior', 'Mid-level', 'Senior', 'Expert']).optional(),
  languages: z.array(z.string()).optional(),
  salary: z.string().optional(),
  currency: z.string().optional(),
  status: z.enum(['active', 'draft', 'closed']).optional(),
  expiresAt: z.string().optional(),
})

/**
 * Helper function to validate data and return formatted errors
 */
export function validateData<T>(schema: z.Schema<T>, data: unknown) {
  try {
    const validated = schema.parse(data)
    return { success: true as const, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      return { success: false as const, errors }
    }
    return {
      success: false as const,
      errors: [{ field: 'unknown', message: 'Validation failed' }]
    }
  }
}

/**
 * Sanitize string input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, '') // Remove dangerous characters
    .trim()
}

/**
 * Sanitize object by sanitizing all string values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {}

  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeString(item) : item
      )
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}
