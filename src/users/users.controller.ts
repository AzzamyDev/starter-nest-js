import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    UseGuards
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDetailDto } from './dto/update-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('api/users')
    findAll() {
        return this.usersService.findAll()
    }

    @Get('api/users/:userId')
    findById(@Param() userId: string) {
        return this.usersService.findById(userId)
    }

    @Put('api/users/:userId')
    update(
        @Body() updateUserDto: UpdateUserDetailDto,
        @Param() userId: string
    ) {
        return this.usersService.update(userId, updateUserDto)
    }

    @Delete('api/users/:userId')
    remove(@Param() userId: string) {
        return this.usersService.remove(userId)
    }
}
