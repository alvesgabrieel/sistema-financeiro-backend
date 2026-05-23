import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    @Public()
    signIn(@Body() body: { email: string; password?: string; }) {
        return this.authService.signIn(body.email, body.password);
    }

    
}
