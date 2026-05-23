import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') ?? '1h') as any,
          algorithm: (configService.get<string>('JWT_ALGORITHM') ?? 'HS256') as any,
        },
      }),
    }),
    PrismaModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
