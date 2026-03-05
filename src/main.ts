import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NotFoundExceptionFilter } from './config/exception/NotFoundExceptionFilter'
import { NestExpressApplication } from '@nestjs/platform-express'

const PORT = process.env.PORT || 3000

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.enableCors({
        origin: '*'
    })

    app.useGlobalFilters(new NotFoundExceptionFilter())
    // app.setGlobalPrefix('api')
    await app.listen(PORT)
}
bootstrap()
