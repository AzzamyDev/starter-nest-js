import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common'
import { AirlinesService } from './airlines.service'
import { CreateAirlineDto } from './dto/create-airline.dto'
import { UpdateAirlineDto } from './dto/update-airline.dto'

@Controller('api/airlines')
export class AirlinesController {
    constructor(private readonly airlinesService: AirlinesService) {}

    @Post()
    async create(@Body() createAirlineDto: CreateAirlineDto) {
        return {
            message: 'Success',
            data: await this.airlinesService.create(createAirlineDto)
        }
    }

    @Get()
    async findAll() {
        return {
            message: 'Success',
            data: await this.airlinesService.findAll()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return {
            message: 'Success',
            data: await this.airlinesService.findOne(id)
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAirlineDto: UpdateAirlineDto
    ) {
        return {
            message: 'Success',
            data: await this.airlinesService.update(id, updateAirlineDto)
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return { message: await this.airlinesService.remove(id) }
    }
}
