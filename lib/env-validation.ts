// lib/env-validation.ts
import { z } from 'zod';

const envSchema = z.object({
  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, 'Clerk publishable key is required'),
  CLERK_SECRET_KEY: z.string().min(1, 'Clerk secret key is required'),
  CLERK_WEBHOOK_SECRET: z.string().min(1, 'Clerk webhook secret is required'),
  
  // Database
  DATABASE_URL: z.string().url('Invalid database URL'),
  DIRECT_URL: z.string().url('Invalid direct database URL'),
  
  // External APIs
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required').optional(),
  NEXT_PUBLIC_GEMINI_API_KEY: z.string().min(1, 'Gemini API key is required').optional(),
  RESEND_API_KEY: z.string().min(1, 'Resend API key is required').optional(),
  
  // File Upload
  UPLOADTHING_SECRET: z.string().min(1, 'UploadThing secret is required').optional(),
  UPLOADTHING_APP_ID: z.string().min(1, 'UploadThing app ID is required').optional(),
  
  // Video Processing
  MUX_TOKEN_ID: z.string().min(1, 'Mux token ID is required').optional(),
  MUX_TOKEN_SECRET: z.string().min(1, 'Mux token secret is required').optional(),
  
  // Payment
  STRIPE_API_KEY: z.string().min(1, 'Stripe API key is required').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Stripe webhook secret is required').optional(),
  
  // AWS
  AWS_ACCESS_KEY: z.string().min(1, 'AWS access key is required').optional(),
  AWS_SECRET_KEY: z.string().min(1, 'AWS secret key is required').optional(),
  AWS_REGION: z.string().min(1, 'AWS region is required').optional(),
  S3_BUCKET: z.string().min(1, 'S3 bucket name is required').optional(),
  
  // App Configuration
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL').optional(),
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL').optional(),
  NEXTAUTH_SECRET: z.string().min(1, 'NextAuth secret is required').optional(),
  NEXT_PUBLIC_TEACHER_ID: z.string().min(1, 'Teacher ID is required').optional(),
  
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

export function validateEnv(): Env {
  if (validatedEnv) {
    return validatedEnv;
  }

  try {
    validatedEnv = envSchema.parse(process.env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(
        `Environment validation failed:\n${missingVars.join('\n')}`
      );
    }
    throw error;
  }
}

// Validate environment on module load in production
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

export default validateEnv;
