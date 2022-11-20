import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      username: user.username,
      _id: user._id,
      sub: user._id,
    };

    return this.jwtService.sign(payload);
  }
}
