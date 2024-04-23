import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UpdateFinancerSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    contact: z.string().optional(),
    status: z.boolean().optional()
})
export class UpdateFinancerDto extends createZodDto(UpdateFinancerSchema) {}
