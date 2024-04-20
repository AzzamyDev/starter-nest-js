import { Module } from '@nestjs/common'
import { PrismaModule } from './config/prisma/prisma.module'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [PrismaModule, UsersModule, AuthModule, ConfigModule.forRoot()],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe
        },
        { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor }
    ]
})
export class AppModule {}
