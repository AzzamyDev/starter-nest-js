import { Injectable } from '@nestjs/common'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class TravelsService {
    constructor(private prismaService: PrismaService) {}

    async create(createTravelDto: CreateTravelDto, photo: string) {
        return this.prismaService.travel.create({
            data: {
                ...createTravelDto,
                photo
            }
        })
    }

    async findAll() {
        return this.prismaService.travel.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.travel.findFirstOrThrow({
            where: {
                id
            }
        })
    }

    async update(
        id: string,
        updateTravelDto: UpdateTravelDto,
        photo: string | null | undefined
    ) {
        await this.prismaService.travel.findFirstOrThrow({
            where: {
                id
            }
        })

        return this.prismaService.travel.update({
            where: {
                id
            },
            data: {
                ...updateTravelDto,
                ...(photo
                    ? {
                          photo
                      }
                    : {})
            }
        })
    }

    async remove(id: string) {
        await this.prismaService.travel.findFirstOrThrow({
            where: {
                id
            }
        })

        await this.prismaService.travel.delete({
            where: {
                id
            }
        })

        return 'Data Deleted'
    }
}
