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
    agentUploadOption
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

    // Upgdare to Member
}
