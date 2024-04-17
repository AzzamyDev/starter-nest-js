import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const CreateProductSchema = z.object({
    storeId: z.number(),
    slug: z.string(),
    name: z.string(),
    sku: z.string(),
    barcode: z.string(),
    price: z.number(),
    stock: z.number(),
    factory: z.string(),
    drugClass: z.string(),
    category: z.string(),
    unit: z.string(),
    status: z.boolean(),
    minStock: z.number(),
})
export class CreateProductDto extends createZodDto(CreateProductSchema) { }
