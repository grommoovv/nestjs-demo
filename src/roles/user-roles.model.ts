import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { UserModel } from 'src/users/users.model'
import { RoleModel } from './roles.model'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel> {
  // Id
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  // Role Id
  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER })
  roleId: number

  // Description
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number
}
