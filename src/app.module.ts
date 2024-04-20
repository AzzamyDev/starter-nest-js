import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
