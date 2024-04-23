import { PackageType, Tenor } from '@prisma/client'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const PackagePriceSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number(),
    cost: z.number(),
    dp: z.number(),
    tenor: z.nativeEnum(Tenor)
})

export const CreateTravelPackageSchema = z.object({
    travelId: z.string(),
    name: z.string(),
    type: z.nativeEnum(PackageType),
    airlineId: z.string(),
    hotelId: z.string(),
    guideName: z.string(),
    description: z.string().optional(),
    status: z.boolean().optional(),
    prices: z.array(PackagePriceSchema).min(1)
})

export class CreateTravelPackageDto extends createZodDto(
    CreateTravelPackageSchema
) {}

export class CreatePackagePriceDto extends createZodDto(PackagePriceSchema) {}
