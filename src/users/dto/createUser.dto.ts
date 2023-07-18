import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsEmail } from 'class-validator'

export class CreateUserDto {
  // Email
  @ApiProperty({ example: 'user@email.test', description: 'Адрес электронной почты пользователя' })
  @IsString({ message: 'Поле должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string

  // Password
  @ApiProperty({ example: 'qwerty123456', description: 'Пароль пользователя' })
  @Length(4, 16, { message: 'Пароль должен содержать от 4 до 16 символов' })
  readonly password: string

  constructor() {}
}
