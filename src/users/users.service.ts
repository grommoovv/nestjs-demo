import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserModel } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/createUser.dto'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from './dto/addRole.dto'
import { BanUserDto } from './dto/banUser.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private UserRepository: typeof UserModel,
    private RoleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.UserRepository.create(dto)
    const role = await this.RoleService.getRoleByValue('ADMIN')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    const users = await this.UserRepository.findAll({ include: { all: true } })
    return users
  }

  async getAllUserByEmail(email: string) {
    const user = await this.UserRepository.findOne({ where: { email }, include: { all: true } })
    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.UserRepository.findByPk(dto.userId)
    const role = await this.RoleService.getRoleByValue(dto.value)

    if (user && role) {
      await user.$add('role', role.id)
      return dto
    } else {
      throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }
  }

  async banUser(dto: BanUserDto) {
    const user = await this.UserRepository.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('Пользователь  не найден', HttpStatus.NOT_FOUND)
    }
    user.isBanned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
