import * as z from 'zod';

// ---------------------------
// --- Login Validations ---
// ---------------------------
export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .min(1, 'Email is required')
    .toLowerCase(),

  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

// ---------------------------
// --- Sign Up Validations ---
// ---------------------------
export const SignUpSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .toLowerCase()
    .min(6, 'Username must be at least 6 characters')
    .max(50, 'Username cannot be longer than 50 characters')
    .refine((value) => /^[a-z0-9_]+$/.test(value), {
      message:
        'Uppercase letters, special characters, or spaces are not allowed',
    }),

  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .min(1, 'Email is required')
    .toLowerCase(),

  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

// ----------------------------------
// --- Forgot Password Validations --
// ----------------------------------
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .min(1, 'Email is required'),
});

// ----------------------------------
// --- Reset Password Validations ---
// ----------------------------------
export const ResetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  passwordConfirm: z.string().min(6, 'Password must be at least 6 characters'),
});
