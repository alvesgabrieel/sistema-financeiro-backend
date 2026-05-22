import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const passwordHashed = await bcrypt.hash(createUserDto.password, 10);

        const user: User = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed,
        }

        this.users.push(user);

        console.log(this.users)

        return user
    };
}
