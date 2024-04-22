import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    ParseFilePipeBuilder,
    HttpStatus,
    UseGuards
} from '@nestjs/common'
import { TravelPackagesService } from './travel-packages.service'
import { CreateTravelPackageDto } from './dto/create-travel-package.dto'
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { travelUploadOption } from 'src/helpers/storage'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('api/travel-packages')
export class TravelPackagesController {
    constructor(
        private readonly travelPackagesService: TravelPackagesService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo', travelUploadOption))
    async create(
        @Body() createTravelDto: CreateTravelPackageDto,
        @UploadedFile(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false
            })
        )
        photo: Express.Multer.File
    ) {
        return {
            message: 'Success',
            data: await this.travelPackagesService.create(
                createTravelDto,
                photo?.path
            )
        }
    }

    @Get()
    async findAll() {
        return {
            message: 'Success',
            data: await this.travelPackagesService.findAll()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            message: 'Success',
            data: await this.travelPackagesService.findOne(id)
        }
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('photo', travelUploadOption))
    async update(
        @Param('id') id: string,
        @Body() updateTravelPackageDto: UpdateTravelPackageDto,
        @UploadedFile(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false
            })
        )
        photo: Express.Multer.File
    ) {
        return {
            message: 'Success',
            data: await this.travelPackagesService.update(
                id,
                updateTravelPackageDto,
                photo?.path
            )
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {
            message: await this.travelPackagesService.remove(id)
        }
    }

    @Get(':mitraId')
    async GetPakageByMitraId(@Param('mitraId') mitraId: string) {
        return {
            message: 'Success',
            data: await this.travelPackagesService.GetHajiUmrahByMitraId(
                mitraId
            )
        }
    }

    @Get(':id')
    async GetPakageById(@Param('id') id: string) {
        return {
            message: 'Success',
            data: await this.travelPackagesService.GetHajiUmrahById(id)
        }
    }
}
