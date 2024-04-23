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

    @Get('travel/:id')
    async getByTravelId(@Param('id') id: string) {
        return {
            message: 'Success',
            data: await this.travelPackagesService.getByTravelId(id)
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
}
