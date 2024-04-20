import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UpdateUserDetailSchema = z.object({
    // isi dengan user detail schema
})

export class UpdateUserDetailDto extends createZodDto(UpdateUserDetailSchema) {}
