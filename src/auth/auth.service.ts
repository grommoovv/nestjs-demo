import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcryptjs'
import { UserModel } from 'src/users/users.model'

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService, private JwtService: JwtService) {}

  async login(UserDto: CreateUserDto) {
    const user = await this.validateUser(UserDto)
    return this.generateToken(user)
  }

  async registragion(UserDto: CreateUserDto) {
    const candidate = await this.UsersService.getAllUserByEmail(UserDto.email)

    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await bcrypt.hash(UserDto.password, 7)
    const user = await this.UsersService.createUser({ ...UserDto, password: hashedPassword })
    return this.generateToken(user)
  }

  private async generateToken(user: UserModel) {
    const payload = { id: user.id, email: user.email, roles: user.roles }
    return {
      token: this.JwtService.sign(payload),
    }
  }

  private async validateUser(UserDto: CreateUserDto) {
    const user = await this.UsersService.getAllUserByEmail(UserDto.email)
    const isPasswordValid = await bcrypt.compare(UserDto.password, user.password)

    if (user && isPasswordValid) {
      return user
    } else {
      throw new UnauthorizedException({ message: 'Неверный email или пароль' })
    }
  }
}
