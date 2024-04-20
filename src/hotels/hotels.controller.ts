import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
    ParseFilePipeBuilder,
    HttpStatus
} from '@nestjs/common'
import { HotelsService } from './hotels.service'
import { CreateHotelDto } from './dto/create-hotel.dto'
import { UpdateHotelDto } from './dto/update-hotel.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import {
    hotelUploadOption,
    MAX_PROFILE_PICTURE_SIZE_IN_BYTES
} from 'src/helpers/storage'

@Controller('api/hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('images', hotelUploadOption))
    async create(
        @Body() createHotelDto: CreateHotelDto,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES
                })
                .build({
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
    @UseInterceptors(FileInterceptor('images', hotelUploadOption))
    async update(
        @Param('id') id: string,
        @Body() updateHotelDto: UpdateHotelDto,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES
                })
                .build({
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
                images.map((file) => file.path)
            )
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return { message: await this.hotelsService.remove(id) }
    }
}
