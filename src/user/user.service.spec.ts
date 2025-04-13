import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock, userRepositoryMockValue } from "../testing/user-repository.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { createUserDTO } from "../testing/create-user-dto.mock";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { updatePutUserDTO } from "../testing/update-put-dto.mock";
import { updatePatchUserDTO } from "../testing/update-patch-dto.mock";


describe('UserService', () => {

    let userService: UserService;
    let userRepository: Repository<UserEntity>

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRepositoryMock
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get(getRepositoryToken(UserEntity))

    });

    test('Validar a definição', () => {
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('create', () => {

        test('method create', async () => {

            jest.spyOn(userRepositoryMockValue, 'exists').mockResolvedValue(false);

            const resultado = await userService.create(createUserDTO);

            expect(resultado).toEqual(userEntityList[0]);

        })

    });
    describe('read', () => {

        test('method list', async () => {

            const resultado = await userService.list();

            expect(resultado).toEqual(userEntityList);

        });

        test('method show', async () => {

            const resultado = await userService.show(1);

            expect(resultado).toEqual(userEntityList[0]);

        });


    });

    describe('update', () => {

        test('method update', async () => {

            const resultado = await userService.update(1, updatePutUserDTO);

            expect(resultado).toEqual(userEntityList[0]);

        });

        test('method updatePartial', async () => {

            const resultado = await userService.updatePartial(1, updatePatchUserDTO);

            expect(resultado).toEqual(userEntityList[0]);

        });

    });
    describe('delete', () => {

        test('method delete', async () => {

            const resultado = await userService.delete(1);

            expect(resultado).toEqual(true);

        });

    });

});