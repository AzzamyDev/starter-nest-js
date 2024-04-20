import { Injectable } from '@nestjs/common'
import { CreateHotelDto } from './dto/create-hotel.dto'
import { UpdateHotelDto } from './dto/update-hotel.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class HotelsService {
    constructor(private prismaService: PrismaService) {}

    async create(createHotelDto: CreateHotelDto, images: string[] | undefined) {
        return this.prismaService.hotel.create({
            data: {
                ...createHotelDto,
                ...(images
                    ? {
                          images: {
                              createMany: {
                                  data: images.map((image) => ({
                                      image
                                  }))
                              }
                          }
                      }
                    : {})
            },
            include: {
                images: {
                    select: {
                        image: true
                    }
                }
            }
        })
    }

    async findAll() {
        return this.prismaService.hotel.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.hotel.findFirstOrThrow({
            where: {
                id
            },
            include: {
                images: {
                    select: {
                        image: true
                    }
                }
            }
        })
    }

    async update(id: string, updateHotelDto: UpdateHotelDto, images: string[]) {
        await this.prismaService.hotel.findFirstOrThrow({
            where: {
                id
            }
        })

        return this.prismaService.hotel.update({
            where: {
                id
            },
            data: {
                ...updateHotelDto,
                ...(images
                    ? {
                          images: {
                              createMany: {
                                  data: images.map((image) => ({
                                      image
                                  }))
                              }
                          }
                      }
                    : {})
            },
            include: {
                images: {
                    select: {
                        image: true
                    }
                }
            }
        })
    }

    async remove(id: string) {
        await this.prismaService.hotel.findFirstOrThrow({
            where: {
                id
            }
        })

        await this.prismaService.hotel.delete({
            where: {
                id
            }
        })

        return 'Data deleted'
    }
}
