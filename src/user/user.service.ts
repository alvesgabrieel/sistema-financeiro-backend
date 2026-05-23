import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { PublicUser, User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<PublicUser> {
        const passwordHashed = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: passwordHashed,
            }
        })

        const { password, ...rest } = user;

        return rest as PublicUser;
    };
}
