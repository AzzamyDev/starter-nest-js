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
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import {
    agentUploadOption,
    MAX_PROFILE_PICTURE_SIZE_IN_BYTES
} from 'src/helpers/storage'
import { UpdateUserDetailDto } from './dto/update-user.dto'
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

    @Patch(':userId')
    async update(
        @Body() updateUserDto: UpdateUserDetailDto,
        @Param() userId: string
    ) {
        return {
            message: 'Success',
            data: await this.usersService.update(userId, updateUserDto)
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
            new ParseFilePipeBuilder()
                .build({
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
}
