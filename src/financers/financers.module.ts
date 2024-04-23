import { Module } from '@nestjs/common'
import { FinancersService } from './financers.service'
import { FinancersController } from './financers.controller'

@Module({
    controllers: [FinancersController],
    providers: [FinancersService]
})
export class FinancersModule {}
