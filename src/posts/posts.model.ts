import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { UserModel } from 'src/users/users.model'

interface PostsCreationAttributes {
	userId: number
  title: string
  content: string
	image: string
}

@Table({ tableName: 'posts' })
export class PostsModel extends Model<PostsModel, PostsCreationAttributes> {
  // Id
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  // Value
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string

  // Description
  @Column({ type: DataType.STRING })
  content: string

  @Column({ type: DataType.STRING })
  image: string

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => UserModel)
  author: UserModel
}
