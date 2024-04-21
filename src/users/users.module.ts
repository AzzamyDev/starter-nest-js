import { Global, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { AgentsModule } from './agents/agents.module';

@Global()
@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [AgentsModule]
})
export class UsersModule {}
