import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NotFoundExceptionFilter } from './config/exception/NotFoundExceptionFilter'

const PORT = process.env.PORT || 3000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalFilters(new NotFoundExceptionFilter())

    await app.listen(PORT)
}
bootstrap()
