import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import type { User } from './interfaces/user.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    async getUserByEmail(@Body() body: { email: string }): Promise<User | null> {
        return this.userService.getUserByEmail(body.email);
    }

    @Post()
    async createUser(@Body() CreateUser: CreateUserDto): Promise<User> {
        return this.userService.createUser(CreateUser);
    }
    
    @UseGuards(AuthGuard)
    @Get('all')
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

}
