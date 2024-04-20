import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
]

export const CreateFinancerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    contact: z.string(),
    status: z.boolean().optional()
})

export class CreateFinancerDto extends createZodDto(CreateFinancerSchema) {}
