import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserModel } from './users.model'
import { Roles } from 'src/auth/decorators/roleAuth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { AddRoleDto } from './dto/addRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() UserDto: CreateUserDto) {
    return this.UserService.createUser(UserDto)
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.UserService.getAllUsers()
  }

  @ApiOperation({ summary: 'Выдать роль пользователю' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.UserService.addRole(dto)
  }

  @ApiOperation({ summary: 'Заблокировать пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.UserService.banUser(dto)
  }
}
