import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const CreateAirlineSchema = z.object({
    name: z.string(),
    status: z.boolean().optional()
})

export class CreateAirlineDto extends createZodDto(CreateAirlineSchema) {}
