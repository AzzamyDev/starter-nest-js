import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UpdateUserDetailDto } from './dto/update-user.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'
import * as moment from 'moment'
import { Agent } from './entities/user.entity'
import { UpgradeStatus, UserType } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async upgradeToAgent(userId: string, data: Agent) {
        const userData = await this.prismaService.user.findFirstOrThrow({
            where: {
                id: userId
            }
        })

        // const saltOrRounds = 10
        // const password = userData.phone as string
        // const hashedPassword = await bcrypt.hash(password, saltOrRounds)

        const [user, agent] = await this.prismaService.$transaction([
            this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    userType: UserType.AGENT,
                    upgradeStatus: UpgradeStatus.REVIEWED
                    // password: hashedPassword
                }
            }),
            this.prismaService.agent.create({
                data: {
                    userId,
                    ...data
                }
            })
        ])

        return { user, agent }
    }

    // Upgrade to Member

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
