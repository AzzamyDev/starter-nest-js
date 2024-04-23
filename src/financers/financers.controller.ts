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
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { financerUploadOption, MAX_PROFILE_PICTURE_SIZE_IN_BYTES } from 'src/helpers/storage'
import { CreateFinancerDto } from './dto/create-financer.dto'
import { UpdateFinancerDto } from './dto/update-financer.dto'
import { FinancersService } from './financers.service'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
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
