import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from './../users/users.module';
import { SocialService } from './social.service';

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, SocialService],
})
export class AuthModule {}
