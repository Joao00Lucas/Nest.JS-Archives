import {Body, Controller, Get, Post, Put, Patch, Delete, UseInterceptors, UseGuards} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')

export class UserController{

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() { name, email, password, role }: CreateUserDTO) {
        return this.userService.create({email, name, password, role});
    }

    @Get()
    async list() {
        return this.userService.list();
    }

    @Get(':id')
    async show(@ParamId() id: number) {
        console.log({id});
        
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() { name, email, password, role }: UpdatePutUserDTO, @ParamId() id: number) {
        return this.userService.update(id, { name, email, password, role });
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
        return this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}