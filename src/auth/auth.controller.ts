import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

	constructor(private AuthService: AuthService) {}

	@Post('/login')
	login(@Body() UserDto: CreateUserDto) {
		return this.AuthService.login(UserDto)
	}

	@Post('/registration')
	registragion(@Body() UserDto: CreateUserDto) {
		return this.AuthService.registragion(UserDto)

	}
}
