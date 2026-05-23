import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(email: string, password?: string): Promise<{ access_token: string }> {
        if (!password) throw new BadRequestException('Missing password');

        const user = await this.userService.getUserByEmail(email);

        if (!user) throw new UnauthorizedException();

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) throw new UnauthorizedException();
        
        const payload = { sub: user.id, email: user.email };
        
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
