import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import {
    agentUploadOption,
    MAX_PROFILE_PICTURE_SIZE_IN_BYTES,
    requestMemberUploadOption,
    userDetailUploadOption
} from 'src/helpers/storage'
import { UsersService } from './users.service'

@UseGuards(AuthGuard)
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return {
            message: 'Success',
            data: await this.usersService.findAll()
        }
    }

    @Get(':userId')
    async findById(@Param('userId') userId: string) {
        return {
            message: 'Success',
            data: await this.usersService.findById(userId)
        }
    }

    @Delete(':userId')
    async remove(@Param() userId: string) {
        return { message: await this.usersService.remove(userId) }
    }

    @Post(':userId/upgrade/agent')
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
            data: await this.usersService.upgradeToAgent(userId, {
                name,
                siup: files?.siup[0].path,
                npwp: files?.npwp[0].path
            })
        }
    }

    // Upgdare to Member
    @Post(':userId/upgrade/member')
    @UseInterceptors(
        FileFieldsInterceptor(
            [{ name: 'sk', maxCount: 1 }],
            requestMemberUploadOption
        )
    )
    async upgradeToMember(
        @Param('userId') userId: string,
        @Body('agentId') agentId: string,
        @UploadedFiles(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: true
            })
        )
        files: { sk: Express.Multer.File[] }
    ) {
        const sk = files?.sk[0].path
        return {
            message: 'Success',
            data: await this.usersService.upgradeToMember(userId, agentId, sk)
        }
    }

    // update user detail
    @Patch(':userId')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'selfiePhoto ', maxCount: 1 },
                { name: 'couplePhoto', maxCount: 1 },
                { name: 'identityPhoto', maxCount: 1 },
                { name: 'kkPhoto', maxCount: 1 },
                { name: 'npwpPhoto', maxCount: 1 }
            ],
            userDetailUploadOption
        )
    )
    async updateDetailUser(
        @Param('userId') userId: string,
        @Body() payload: any,
        @UploadedFiles(
            new ParseFilePipeBuilder().build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: true
            })
        )
        files: {
            selfiePhoto: Express.Multer.File[]
            couplePhoto: Express.Multer.File[]
            identityPhoto: Express.Multer.File[]
            kkPhoto: Express.Multer.File[]
            npwpPhoto: Express.Multer.File[]
        }
    ) {
        const selfiePhoto = files?.selfiePhoto[0].path
        const couplePhoto = files?.couplePhoto[0].path
        const identityPhoto = files?.identityPhoto[0].path
        const kkPhoto = files?.kkPhoto[0].path
        const npwpPhoto = files?.npwpPhoto[0].path

        return {
            message: 'Success',
            data: await this.usersService.update(
                { ...payload, userId },
                selfiePhoto,
                couplePhoto,
                identityPhoto,
                kkPhoto,
                npwpPhoto
            )
        }
    }
}
