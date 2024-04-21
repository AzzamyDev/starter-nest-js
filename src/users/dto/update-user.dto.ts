import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UpdateUserDetailSchema = z.object({
    userId: z.string(),
    nik: z.string(),
    birthPlace: z.string(),
    birthDate: z.string(),
    gender: z.any(),
    identityAddress: z.string(),
    residenceAddress: z.string(),
    rt: z.string(),
    rw: z.string(),
    province: z.string(),
    regency: z.string(),
    district: z.string(),
    subDistrict: z.string(),
    postalCode: z.string(),
    maritalStatus: z.any(),
    biologicalMother: z.string()
})

export class UpdateUserDetailDto extends createZodDto(UpdateUserDetailSchema) {}
