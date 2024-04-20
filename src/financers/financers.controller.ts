import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFile,
    ParseFilePipeBuilder,
    HttpStatus,
    UseInterceptors
} from '@nestjs/common'
import { FinancersService } from './financers.service'
import { CreateFinancerDto } from './dto/create-financer.dto'
import { UpdateFinancerDto } from './dto/update-financer.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { financerUploadOption } from 'src/helpers/storage'
import { ZodSerializerDto } from 'nestjs-zod'

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 10 * 1024 * 1024

@Controller('api/financers')
export class FinancersController {
    constructor(private readonly financersService: FinancersService) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo', financerUploadOption))
    async create(
        @Body() createFinancerDto: CreateFinancerDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES
                })
                .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
        )
        photo: Express.Multer.File
    ) {
        return {
            message: 'Success',
            data: await this.financersService.create(
                createFinancerDto,
                photo.path
            )
        }
    }

    @Get()
    async findAll() {
        return {
            message: 'Success',
            data: await this.financersService.findAll()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            message: 'Success',
            data: await this.financersService.findOne(id)
        }
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('photo', financerUploadOption))
    async update(
        @Param('id') id: string,
        @Body() updateFinancerDto: UpdateFinancerDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    fileIsRequired: false
                })
        )
        photo: Express.Multer.File
    ) {
        return {
            message: 'Success',
            data: await this.financersService.update(
                id,
                updateFinancerDto,
                photo?.path
            )
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {
            message: await this.financersService.remove(id)
        }
    }
}
