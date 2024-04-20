import { Test, TestingModule } from '@nestjs/testing'
import { FinancersController } from './financers.controller'
import { FinancersService } from './financers.service'

describe('FinancersController', () => {
    let controller: FinancersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FinancersController],
            providers: [FinancersService]
        }).compile()

        controller = module.get<FinancersController>(FinancersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
