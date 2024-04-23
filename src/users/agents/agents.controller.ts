import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { AgentsService } from './agents.service'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { agentUploadOption } from 'src/helpers/storage'

@Controller('api/agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService) {}

    @Post('upgrade/:userId')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'siup', maxCount: 1 },
                { name: 'npwp', maxCount: 1 }
            ],
            agentUploadOption
        )
    )
    async upgradeToAgent(
        @Param('userId') userId: string,
        @Body('name') name: string,
        @UploadedFiles(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: true
            })
        )
        files: { siup: Express.Multer.File[]; npwp: Express.Multer.File[] }
    ) {
        return {
            message: 'Success',
            data: await this.agentsService.upgradeToAgent(userId, {
                name,
                siup: files?.siup[0].path,
                npwp: files?.npwp[0].path
            })
        }
    }
}
