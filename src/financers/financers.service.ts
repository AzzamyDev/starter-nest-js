import { Injectable } from '@nestjs/common'
import { CreateFinancerDto } from './dto/create-financer.dto'
import { UpdateFinancerDto } from './dto/update-financer.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class FinancersService {
    constructor(private prismaService: PrismaService) {}

    async create(createFinancerDto: CreateFinancerDto, photo: string) {
        return this.prismaService.financer.create({
            data: {
                ...createFinancerDto,
                photo
            }
        })
    }

    async findAll() {
        return this.prismaService.financer.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.financer.findFirstOrThrow({
            where: {
                id
            }
        })
    }

    async update(
        id: string,
        updateFinancerDto: UpdateFinancerDto,
        photo: string | null | undefined
    ) {
        await this.prismaService.financer.findFirstOrThrow({
            where: {
                id
            }
        })

        return this.prismaService.financer.update({
            where: {
                id
            },
            data: {
                ...updateFinancerDto,
                ...(photo
                    ? {
                          photo
                      }
                    : {})
            }
        })
    }

    async remove(id: string) {
        await this.prismaService.financer.findFirstOrThrow({
            where: {
                id
            }
        })

        await this.prismaService.financer.delete({
            where: {
                id
            }
        })

        return 'Data Deleted'
    }
}
