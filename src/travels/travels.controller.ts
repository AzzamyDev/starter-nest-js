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
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { TravelsService } from './travels.service'
import { travelUploadOption } from 'src/helpers/storage'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('api/travels')
export class TravelsController {
    constructor(private readonly travelsService: TravelsService) {}

    @Get('/city')
    async getAgentByCity(@Query('regency') regency: string) {
        return {
            message: 'Success',
            data: await this.travelsService.getTravelByCity(regency)
        }
    }
    
    @Post()
    @UseInterceptors(FileInterceptor('photo', travelUploadOption))
    async create(
        @Body() createTravelDto: CreateTravelDto,
        @UploadedFile(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            })
        )
        photo: Express.Multer.File
    ) {
        return {
            message: 'Success',
            data: await this.travelsService.create(createTravelDto, photo.path)
        }
    }

    @Get()
    async findAll() {
        return {
            message: 'Success',
            data: await this.travelsService.findAll()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            message: 'Success',
            data: await this.travelsService.findOne(id)
        }
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('photo', travelUploadOption))
    async update(
        @Param('id') id: string,
        @Body() updateTravelDto: UpdateTravelDto,
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
            data: await this.travelsService.update(
                id,
                updateTravelDto,
                photo?.path
            )
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {
            message: await this.travelsService.remove(id)
        }
    }
}
