import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { UpdateUserDetailDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findAll() {
        return this.prismaService.user.findMany()
    }

    async findById(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            },
            include: {
                detail: true
            }
        })

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async findByPhone(phone: string) {
        const user = this.prismaService.user.findUnique({
            where: {
                phone
            },
            include: {
                detail: true
            }
        })

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async getOtp(userId: string, otp: string) {
        const now = moment()
        return this.prismaService.otp.findUnique({
            where: {
                userId_otp: {
                    userId,
                    otp
                },
                expired: {
                    gt: now.unix()
                }
            },
            include: {
                user: {
                    include: {
                        detail: true
                    }
                }
            }
        })
    }

    async update(id: string, updateUserDetailDto: UpdateUserDetailDto) {
        return `This action updates a #${id} user`
    }

    async remove(id: string) {
        return `This action removes a #${id} user`
    }

    // approved agent

    // approved member
}
