import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, HasMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { PostsModel } from 'src/posts/posts.model'
import { RoleModel } from 'src/roles/roles.model'
import { UserRolesModel } from 'src/roles/user-roles.model'

interface UserCreationAttributes {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttributes> {
  // Id
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  // Email
  @ApiProperty({ example: 'user@email.test', description: 'Адрес электронной почты пользователя' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  // Password
  @ApiProperty({ example: 'qwerty123456', description: 'Пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  // isBanned
  @ApiProperty({ example: 'true', description: 'Заблокирован пользователь или нет' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBanned: boolean

  // Ban Reason
  @ApiProperty({
    example: 'Нарушение пользования сервисом',
    description: 'Причина блокировки',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  roles: RoleModel[]

  @HasMany(() => PostsModel)
  posts: PostsModel[]
}
