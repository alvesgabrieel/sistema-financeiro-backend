import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() body: { email: string, pass: string }) {
        return this.authService.signIn(body.email, body.pass);
    }

    
}
