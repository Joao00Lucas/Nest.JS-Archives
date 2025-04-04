import {Body, Controller, Get, Param, Post, Put, Patch, Delete, ParseIntPipe, UseInterceptors} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";


@UseInterceptors(LogInterceptor)
@Controller('users')

export class UserController{

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() { name, email, password }: CreateUserDTO) {
        return this.userService.create({email, name, password});
    }

    @Get()
    async list() {
        return this.userService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() { name, email, password }: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return this.userService.update(id, { name, email, password });
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}