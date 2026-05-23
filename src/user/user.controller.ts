import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import type { PublicUser, User } from './interfaces/user.interface';
import { Public } from '../common/decorators/public.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    async getUserByEmail(@Body() body: { email: string }): Promise<User | null> {
        return this.userService.getUserByEmail(body.email);
    }
    
    @Public()
    @Post()
    async createUser(@Body() CreateUser: CreateUserDto): Promise<PublicUser> {
        return this.userService.createUser(CreateUser);
    }
    
    @Get('all')
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

}
