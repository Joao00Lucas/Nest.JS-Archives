import { JwtService } from "@nestjs/jwt";
import { accessToken } from "./access-token.mock";


export const jwtServiceMock = {
    provide: JwtService,
    useValue: {
        sign: jest.fn().mockReturnValue({
            accessToken: accessToken


            
        }),
        verify: jest.fn().mockReturnValue({})
        }
};