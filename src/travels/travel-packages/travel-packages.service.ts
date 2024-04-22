import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { CreateTravelPackageDto } from './dto/create-travel-package.dto'
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto'

@Injectable()
export class TravelPackagesService {
    constructor(private prismaService: PrismaService) {}

    async create(
        createTravelpackageDto: CreateTravelPackageDto,
        photo: string | undefined
    ) {
        const check = await this.prismaService.travelPackage.count({
            where: {
                name: createTravelpackageDto.name
            }
        })

        if (check > 0) {
            throw new HttpException(
                `Travel dengan nama ${createTravelpackageDto.name} sudah ada sebelumnya`,
                HttpStatus.BAD_REQUEST
            )
        }

        const { prices, ...payload } = createTravelpackageDto
        return this.prismaService.travelPackage.create({
            data: {
                ...payload,
                photo: photo ?? '',
                packagePrices: {
                    createMany: {
                        data: prices
                    }
                }
            },
            include: {
                packagePrices: true,
                airline: true,
                hotel: {
                    include: {
                        images: true
                    }
                }
            }
        })
    }

    async findAll() {
        return this.prismaService.travelPackage.findMany({
            include: {
                packagePrices: true,
                airline: true,
                hotel: {
                    include: {
                        images: true
                    }
                }
            }
        })
    }

    async findOne(id: string) {
        return this.prismaService.travelPackage.findFirstOrThrow({
            where: {
                id
            },
            include: {
                packagePrices: true,
                airline: true,
                hotel: {
                    include: {
                        images: true
                    }
                }
            }
        })
    }

    async update(
        id: string,
        updateTravelpackageDto: UpdateTravelPackageDto,
        photo: string | null | undefined
    ) {
        await this.prismaService.travelPackage.findFirstOrThrow({
            where: {
                id
            }
        })
        const { prices, ...payload } = updateTravelpackageDto

        await this.prismaService.$transaction(
            prices?.map((it) => {
                return this.prismaService.packagePrice.update({
                    where: {
                        id: it.id
                    },
                    data: it
                })
            }) ?? []
        )

        return this.prismaService.travelPackage.update({
            where: {
                id
            },
            data: {
                ...payload,
                ...(photo
                    ? {
                          photo
                      }
                    : {})
            },
            include: {
                packagePrices: true,
                airline: true,
                hotel: {
                    include: {
                        images: true
                    }
                }
            }
        })
    }

    async remove(id: string) {
        await this.prismaService.travelPackage.findFirstOrThrow({
            where: {
                id
            }
        })

        await this.prismaService.$transaction([
            this.prismaService.packagePrice.deleteMany({
                where: {
                    travelPackageId: id
                }
            }),
            this.prismaService.travelPackage.delete({
                where: {
                    id
                }
            })
        ])

        return 'Data Deleted'
    }

    async GetHajiUmrahByMitraId(mitraId: string) {
        const pakage = await this.prismaService.travelPackage.findFirstOrThrow({
            where: {
                travel: {
                    user: {
                        agent: {
                            id: mitraId
                        }
                    }
                }
            }
        })

        return pakage
    }

    async GetHajiUmrahById(id: string) {
        const pakage = await this.prismaService.travelPackage.findFirstOrThrow({
            where: { id },
            include: {
                travel: true
            }
        })

        return pakage
    }
}
