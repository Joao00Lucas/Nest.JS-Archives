import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";


export const userEntityList: UserEntity[] = [{
    name: 'João Lucas',
    email: 'joaolucas@gmail',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$LGuRDI0vdBHVlhVuUKxE8..IXx52kmszM0.fHRSms2M4teSHVq.Kq',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.Admin
}, {
    name: 'Samara Venancio',
    email: 'samaravenancio@gmail',
    birthAt: new Date('2000-01-01'),
    id: 2,
    password: '$2b$10$LGuRDI0vdBHVlhVuUKxE8..IXx52kmszM0.fHRSms2M4teSHVq.Kq',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.Admin
}, {
    name: 'Rafael Nunes',
    email: 'rafaelnunes@gmail',
    birthAt: new Date('2000-01-01'),
    id: 3,
    password: '$2b$10$LGuRDI0vdBHVlhVuUKxE8..IXx52kmszM0.fHRSms2M4teSHVq.Kq',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.Admin
}];