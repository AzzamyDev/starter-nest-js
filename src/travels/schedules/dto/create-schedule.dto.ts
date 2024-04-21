import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const ScheduleSchema = z.object({
    travelPackageId: z.string(),
    departure: z.string(),
    departureCity: z.string(),
    destinationCity: z.string(),
    duration: z.number(),
    quota: z.number(),
    description: z.string(),
    status: z.boolean().optional()
})

export class CreateScheduleDto extends createZodDto(ScheduleSchema) {}
