import { Body, Controller, Post,  UseGuards, UseInterceptors, BadRequestException, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";
import { Req, UploadedFile,  UploadedFiles } from "@nestjs/common/decorators";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { join } from 'path';
import { FileService } from "../file/file.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";


@Controller('auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    // @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user, @Req() req)  { //, @Req() { tokenPayload }
        return {user: 
            {id: user.id, 
            name: user.name, 
            email: user.email},
            tokenPayload: req.tokenPayload // aqui você acessa só o necessário
        } //tokenPayload
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user, 
    @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({fileType: 'image/png'}),
            new MaxFileSizeValidator({maxSize: 1024 * 15})
        ]
    })) photo: Express.Multer.File) {

        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`);

        try {
            await this.fileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e)
        }
        return { photo };
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    }, {
        name: 'documents',
        maxCount: 10
    }]))
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFieds(@User() user, @UploadedFiles() files: {photo: Express.Multer.File}, documents: Express.Multer.File[]) {
        return files;
    }

}