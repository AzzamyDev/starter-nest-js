import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const CreateHotelSchema = z.object({
    name: z.string(),
    star: z.number(),
    personInRoom: z.number(),
})

export class CreateHotelDto extends createZodDto(CreateHotelSchema) {}
