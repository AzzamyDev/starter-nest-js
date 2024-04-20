import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const RegisterSchema = z.object({
  fullName: z.string(),
  phone: z.string(),
  email: z.string(),
  refferalCode: z.string().nullable(),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
