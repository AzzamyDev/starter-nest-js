import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/generated/client'
import { getConnectionConfig } from './db'

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(config: ConfigService) {
		const url = config.get<string>('database.url', { infer: true })
		if (!url) throw new Error('DATABASE_URL is not set')
		const connectionConfig = getConnectionConfig(url)
		super({
			adapter: new PrismaMariaDb({
				...connectionConfig
			})
		})
	}
}
