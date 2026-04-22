import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		const result = await this.usersService.create(createUserDto)
		return {
			message: 'User created successfully',
			data: result
		}
	}

	@Get()
	async findAll() {
		const result = await this.usersService.findAll()
		return {
			message: 'Get all user successfully',
			data: result
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const result = await this.usersService.findOne(+id)
		return {
			message: 'Get user successfully',
			data: result
		}
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const result = await this.usersService.update(+id, updateUserDto)
		return {
			message: 'Update user successfully',
			data: result
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		await this.usersService.remove(+id)

		return {
			message: 'User deleted successfully'
		}
	}
}
