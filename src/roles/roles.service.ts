import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/createRole.dto'
import { RoleModel } from './roles.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class RolesService {
  constructor(@InjectModel(RoleModel) private RoleRepository: typeof RoleModel) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.RoleRepository.create(dto)
    return role
  }
  async getRoleByValue(value: string) {
    const role = await this.RoleRepository.findOne({ where: { value } })
    return role
  }
}
