import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { User } from './../users/models/user.model';
import { ProfileInput } from './inputs/profile.input';
import { GoogleInput } from './inputs/google.input';
import { FacebookInput } from './inputs/facebook.input';
import { UsersService } from './../users/users.service';
import { SocialService } from './social.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Auth } from './auth.decorator';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private userService: UsersService,
    private socialService: SocialService,
    private authService: AuthService,
  ) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async profile(@Auth() auth: User) {
    return auth;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Auth() auth: User,
    @Args('profileInput') body: ProfileInput,
  ) {
    const { username, email } = body;

    const user = await this.userService.findById(auth._id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    await this.userService.updateOne(auth._id, { email, username });

    return user;
  }

  @Mutation(() => User)
  async signInFacebook(@Args('facebookInput') body: FacebookInput) {
    const details = await this.socialService.getFacebookDetails(body);
    const existedItem = await this.userService.findByFacebookId(details.id);
    if (!existedItem) {
      const result = await this.userService.create({
        email: details.email,
        username: details.name,
        facebookId: details.id,
      });

      const token = await this.authService.generateToken(existedItem);

      return { ...result, token } as User;
    }

    const token = await this.authService.generateToken(existedItem);

    return { ...existedItem, token } as User;
  }

  @Mutation(() => User)
  async signInGoogle(@Args('googleInput') body: GoogleInput) {
    const data = await this.socialService.getGoogleDetails(body.accessToken);

    const existedItem = await this.userService.findByGoogleId(data.sub);

    if (!existedItem) {
      const result = await this.userService.create({
        email: data.email,
        username: data.name || data.email,
        googleId: data.sub,
      });

      const token = await this.authService.generateToken(existedItem);

      return { ...result, token } as User;
    }

    const token = await this.authService.generateToken(existedItem);

    return { ...existedItem, token } as User;
  }
}
