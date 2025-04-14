import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) { }
        
    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        try {

            const data = await this.authService.checkToken((authorization ?? '').split(' ')[1]);
            console.log('data', data);

            request.tokenPayload = data;
            
            request.user = await this.userService.show(data.id);            

            return true;

        } catch (e) {

            console.log('Não foi, revisa o auth.guard');
            return false;
        }
    }
}