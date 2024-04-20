import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserType } from '@prisma/client'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'
import * as moment from 'moment'

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(payload: RegisterDto) {
        // check unik
        const check = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {
                        phone: payload.phone
                    },
                    {
                        email: payload.email
                    }
                ]
            }
        })

        if (check) {
            throw new HttpException(
                `Nomor Telpon atau Email sudah ada sebelumnya`,
                HttpStatus.BAD_REQUEST
            )
        }

        const member = await this.prismaService.user.findFirst({
            where: {
                refferalCode: payload.refferalCode
            },
            select: {
                id: true
            }
        })

        return this.prismaService.user.create({
            data: {
                memberId: member?.id,
                userType: UserType.USER,
                ...payload,
                status: false
            },
            include: {
                detail: true
            }
        })
    }

    async login(phone: string) {
        const user = await this.userService.findByPhone(phone)

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
        }

        // function generateRandomNumber(): string {
        //     return (Math.floor(Math.random() * 900000) + 100000).toFixed()
        // }

        const now = moment()
        const expired = now.clone().add(5, 'minutes')

        console.log(user.phone)
        await this.prismaService.otp.upsert({
            where: {
                userId_otp: {
                    otp: '123456',
                    userId: user.id
                }
            },
            update: {
                expired: expired.unix()
            },
            create: {
                userId: user.id,
                // otp: generateRandomNumber(),
                otp: '123456',
                expired: expired.unix(),
                createdAt: now.unix()
            }
        })

        return user.id
    }

    async validate(userId: string, otp: string, isLogin: boolean) {
        const userOtp = await this.userService.getOtp(userId, otp)

        if (!userOtp) {
            throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST)
        }

        let data: any
        const { user } = userOtp

        if (!isLogin) {
            data = await this.prismaService.user.update({
                where: {
                    id: user.id
                },
                data: {
                    status: true
                }
            })
        } else {
            data = user
        }

        const payload = { sub: user.id, phone: user.phone }
        return {
            user: data,
            token: await this.jwtService.signAsync(payload)
        }
    }
}
