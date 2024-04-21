import { PartialType } from '@nestjs/swagger'
import {
    CreatePackagePriceDto,
    CreateTravelPackageDto
} from './create-travel-package.dto'

export class UpdateTravelPackageDto extends PartialType(
    CreateTravelPackageDto
) {}

export class UpdatePackagePriceDto extends PartialType(CreatePackagePriceDto) {}
