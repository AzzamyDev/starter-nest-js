import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'
import { NotFoundExceptionFilter } from './config/exception/NotFoundExceptionFilter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    patchNestJsSwagger()
    app.useGlobalFilters(new NotFoundExceptionFilter())
    const config = new DocumentBuilder()
        .setTitle('Medivel')
        .setDescription('The Medivel API')
        .setVersion('0.1')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}
bootstrap()
