import { Role } from "../enums/role.enum";
import { UpdatePutUserDTO } from "../user/dto/update-put-user.dto";


export const updatePutUserDTO:UpdatePutUserDTO = {
                birthAt: '2000-01-01',
                email: 'joaolucas@gmail',
                name: 'João Lucas',
                password: '123456',
                role: Role.Admin
            }