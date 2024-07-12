import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class UsersService {
    constructor(readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return this.prismaService.user.create({
            data: createUserDto
        })
    }

    async findAll() {
        return this.prismaService.user.findMany()
    }

    async findOne(id: number) {
        return this.prismaService.user.findUniqueOrThrow({ where: { id } })
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.prismaService.user.findUniqueOrThrow({ where: { id } })

        return this.prismaService.user.update({
            where: { id },
            data: updateUserDto
        })
    }

    async remove(id: number) {
        await this.prismaService.user.findUniqueOrThrow({ where: { id } })

        await this.prismaService.user.delete({ where: { id } })
    }
}
