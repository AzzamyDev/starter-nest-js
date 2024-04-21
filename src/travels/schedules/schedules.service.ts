import { HttpException, Injectable } from '@nestjs/common'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class SchedulesService {
    constructor(private prismaService: PrismaService) {}

    async create(createScheduleDto: CreateScheduleDto) {
        const { departure, ...payload } = createScheduleDto

        await this.prismaService.travelPackage.findFirstOrThrow({
            where: {
                id: payload.travelPackageId
            }
        })

        return this.prismaService.schedule.create({
            data: {
                ...payload,
                departure: new Date(createScheduleDto.departure),
                status: payload.status === undefined ? true : payload.status,
                quotaRemain: createScheduleDto.quota
            }
        })
    }

    async findAll() {
        return this.prismaService.schedule.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.schedule.findFirstOrThrow({
            where: {
                id
            }
        })
    }

    async update(id: string, updateScheduleDto: UpdateScheduleDto) {
        await this.prismaService.travelPackage.findFirstOrThrow({
            where: {
                id: updateScheduleDto.travelPackageId
            }
        })

        await this.prismaService.schedule.findFirstOrThrow({
            where: {
                id
            }
        })

        const { departure, ...payload } = updateScheduleDto

        return this.prismaService.schedule.update({
            where: {
                id
            },
            data: {
                ...payload,
                ...(departure
                    ? {
                          departure: new Date(departure)
                      }
                    : {}),
                status: payload.status === undefined ? true : payload.status
            }
        })
    }

    async remove(id: string) {
        await this.prismaService.schedule.findFirstOrThrow({
            where: {
                id
            }
        })

        await this.prismaService.schedule.delete({
            where: {
                id
            }
        })

        return 'Data Deleted'
    }
}
