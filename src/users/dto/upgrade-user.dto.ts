import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UpgradeUserDetailSchema = z.object({
    name: z.string()
})

export class UpgradeUserDetailDto extends createZodDto(
    UpgradeUserDetailSchema
) {}