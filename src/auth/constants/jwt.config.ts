import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: {
    algorithm: 'HS512',
    expiresIn: '10d',
  },
};
