import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/createRole.dto';

@Controller('roles')
export class RolesController {

	constructor(private RoleService: RolesService) {}


	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.RoleService.createRole(dto)
	}

	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.RoleService.getRoleByValue(value)
	}
}
