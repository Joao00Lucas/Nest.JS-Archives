import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async create(data: CreateUserDTO) {

        if (await this.userRepository.exists({
            where: {
                email: data.email
            }
        })) {
            throw new BadRequestException('Esse email ja foi usado!')
        }

        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt)

        const user = this.userRepository.create(data);

        return this.userRepository.save(user);
    }

    async list() {

        return this.userRepository.find();

    }

    async show(id: number) {

        const test = await this.exists(id);
        console.log('test do userService:', test);

        return this.userRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'password'],
        });


    }

    async update(id: number, { email, name, password, birthAt, role }: UpdatePutUserDTO) {

        await this.exists(id)

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt)

        await this.userRepository.update(id, {
            email,
            name,
            password,
            birthAt: birthAt ? new Date(birthAt) : undefined,
            role
        });

        return this.show(id);
    }

    async updatePartial(id: number, { email, name, password, birthAt, role }: UpdatePatchUserDTO) {

        await this.exists(id)

        const data: any = {}

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (email) {
            data.email = email;
        }

        if (name) {
            data.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt)
        }

        if (role) {
            data.role = role;
        }

        await this.userRepository.update(id, data);

        return this.show(id);
    }

    async delete(id: number) {

        await this.exists(id)

        await this.userRepository.delete(id);

        return true;

    }

    async exists(id: number) {

        const user = await this.userRepository.exists({
            where: {
                id
            },
        });

        if (!user) {
            throw new NotFoundException(`O usuário ${id} não existe!`)
        }

        return true;
    }

}