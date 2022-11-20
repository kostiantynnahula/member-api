import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from './../users/users.module';
import { SocialService } from './social.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './constants/jwt.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule.register(jwtConfig), UsersModule],
  providers: [AuthResolver, SocialService, AuthService, JwtStrategy],
})
export class AuthModule {}
