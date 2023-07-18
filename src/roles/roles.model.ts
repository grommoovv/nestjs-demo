import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { UserModel } from 'src/users/users.model'
import { UserRolesModel } from './user-roles.model'

interface RoleCreationAttributes {
  value: string
  description: string
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttributes> {
  // Id
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  // Value
  @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string

  // Description
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  users: UserModel[]
}
