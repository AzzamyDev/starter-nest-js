import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { Agent } from './entities/agent.entity'
import { UpgradeStatus, UserType } from '@prisma/client'

@Injectable()
export class AgentsService {
    constructor(private prismaService: PrismaService) {}

    async upgradeToAgent(userId: string, data: Agent) {
        const userData = await this.prismaService.user.findFirstOrThrow({
            where: {
                id: userId
            },
            include: {
                agent: true
            }
        })

        if (userData.agent) {
            throw new HttpException(
                'Anda sudah menjadi Mitra / Agent',
                HttpStatus.NOT_ACCEPTABLE
            )
        }

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

    async getAgentByCity(regency: string) {
        const agentData = await this.prismaService.agent.findFirstOrThrow({
            where: {
                user: {
                    detail: {
                        regency
                    }
                }
            },
            include: {
                user: true
            }
        })

        return agentData
    }
}
