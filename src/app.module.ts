import { Module } from '@nestjs/common'
import { PrismaModule } from './config/prisma/prisma.module'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [PrismaModule, ConfigModule.forRoot()],
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
