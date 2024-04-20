import { Test, TestingModule } from '@nestjs/testing'
import { FinancersService } from './financers.service'

describe('FinancersService', () => {
    let service: FinancersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FinancersService]
        }).compile()

        service = module.get<FinancersService>(FinancersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
