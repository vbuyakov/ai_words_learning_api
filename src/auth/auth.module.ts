import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AppConfigService } from '../config/app-config.service';
import { AppConfigModule } from '../config/app-config.module';

@Module({
  imports: [
    UserModule, // Import UserModule to access UserService
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: appConfigService.get('JWT_EXPIRATION_TIME', '1h'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, AppConfigModule],
  controllers: [AuthController],
})
export class AuthModule {}
