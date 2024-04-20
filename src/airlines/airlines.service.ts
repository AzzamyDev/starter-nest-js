import { Injectable } from '@nestjs/common'
import { CreateAirlineDto } from './dto/create-airline.dto'
import { UpdateAirlineDto } from './dto/update-airline.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class AirlinesService {
    constructor(private prismaService: PrismaService) {}

    async create(createAirlineDto: CreateAirlineDto) {
        return this.prismaService.airline.create({
            data: createAirlineDto
        })
    }

    async findAll() {
        return this.prismaService.airline.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.airline.findFirstOrThrow({
            where: {
                id
            }
        })
    }

    async update(id: string, updateAirlineDto: UpdateAirlineDto) {
        await this.prismaService.airline.findFirstOrThrow({
            where: {
                id
            }
        })

        return this.prismaService.airline.update({
            where: {
                id
            },
            data: updateAirlineDto
        })
    }

    async remove(id: string) {
        await this.prismaService.airline.findFirstOrThrow({
            where: {
                id
            }
        })

        await this.prismaService.airline.delete({
            where: {
                id
            }
        })

        return 'Data deleted'
    }
}
