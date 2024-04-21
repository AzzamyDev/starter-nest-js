import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const CreateTravelSchema = z.object({
    userId: z.string(),
    financerId: z.string(),
    name: z.string(),
    address: z.string(),
    contact: z.string()
})

export class CreateTravelDto extends createZodDto(CreateTravelSchema) {}
