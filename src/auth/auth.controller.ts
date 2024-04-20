import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Request,
    UseGuards
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { UsersService } from 'src/users/users.service'

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @Post('api/register')
    async register(@Body() registerDto: RegisterDto) {
        try {
            const result = await this.authService.register(registerDto)
            return {
                message: 'Register succesfully',
                data: result
            }
        } catch (error) {
            throw error
        }
    }

    @Post('api/login')
    async login(@Query('phone') phone: string) {
        try {
            const result = await this.authService.login(phone)
            return {
                message: result
            }
        } catch (error) {
            throw error
        }
    }

    @Post('api/validate/otp')
    async validateOtp(@Query('otp') otp: string) {
        try {
            const result = await this.authService.validate(otp)
            return {
                message: 'Login succesfully',
                data: result
            }
        } catch (error) {
            throw error
        }
    }

    @UseGuards(AuthGuard)
    @Get('api/profile')
    async getProfile(@Request() req: Request | any) {
        try {
            return {
                message: 'Success',
                data: req.user
            }
        } catch (error) {
            throw error
        }
    }
}
