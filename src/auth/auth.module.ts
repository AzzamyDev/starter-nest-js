import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { jwtConstants } from './constants'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret
            // signOptions: { expiresIn: undefined } // Setting expired
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService]
})
export class AuthModule {}
