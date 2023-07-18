import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from 'src/users/users.model'
import { PostsModel } from './posts.model'
import { FilesModule } from 'src/files/files.module'

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([UserModel, PostsModel]), FilesModule],
})
export class PostsModule {}
