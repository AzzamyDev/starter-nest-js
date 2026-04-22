import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { NotFoundExceptionFilter } from './config/exception/NotFoundExceptionFilter'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const config = app.get(ConfigService)
	const port = config.get<number>('app.port', { infer: true }) ?? 3000

	app.enableCors({
		origin: '*'
	})

	app.useGlobalFilters(new NotFoundExceptionFilter())
	// app.setGlobalPrefix('api')
	await app.listen(port)
}
bootstrap()
