import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import { hotelUploadOption } from 'src/helpers/storage'
import { CreateHotelDto } from './dto/create-hotel.dto'
import { UpdateHotelDto } from './dto/update-hotel.dto'
import { HotelsService } from './hotels.service'

@UseGuards(AuthGuard)
@Controller('api/hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images', 5, hotelUploadOption))
    async create(
        @Body() createHotelDto: CreateHotelDto,
        @UploadedFiles(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false
            })
        )
        images: Array<Express.Multer.File>
    ) {
        return {
            mesage: 'Success',
            data: await this.hotelsService.create(
                createHotelDto,
                images?.map((file) => file.path)
            )
        }
    }

    @Get()
    async findAll() {
        return {
            mesage: 'Success',
            data: await this.hotelsService.findAll()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            mesage: 'Success',
            data: await this.hotelsService.findOne(id)
        }
    }

    @Patch(':id')
    @UseInterceptors(FilesInterceptor('images', 5, hotelUploadOption))
    async update(
        @Param('id') id: string,
        @Body() updateHotelDto: UpdateHotelDto,
        @UploadedFiles(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false
            })
        )
        images: Array<Express.Multer.File>
    ) {
        return {
            mesage: 'Success',
            data: await this.hotelsService.update(
                id,
                updateHotelDto,
                images?.map((file) => file.path)
            )
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return { message: await this.hotelsService.remove(id) }
    }
}
