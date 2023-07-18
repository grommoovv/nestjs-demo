import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { RoleModel } from './roles.model'
import { UserModel } from 'src/users/users.model'
import { UserRolesModel } from './user-roles.model'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRolesModel])],
  exports: [RolesService],
})
export class RolesModule {}
