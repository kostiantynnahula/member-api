import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './../users/models/user.model';
import { ProfileInput } from './inputs/profile.input';
import { GoogleInput } from './inputs/google.input';
import { FacebookInput } from './inputs/facebook.input';
import { UsersService } from './../users/users.service';
import { SocialService } from './social.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private userService: UsersService,
    private socialService: SocialService,
    private authService: AuthService,
  ) {}

  @Query((returns) => User)
  async profile() {
    return {
      id: 'user_id',
      username: 'user_name',
      email: 'user_email',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => User)
  async updateProfile(@Args('profileInput') body: ProfileInput) {
    const { username, email } = body;

    return {
      _id: 'user_id',
      username: username || 'user_name',
      email: email || 'user_email',
    };
  }

  @Mutation((returns) => User)
  async signInFacebook(@Args('facebookInput') body: FacebookInput) {
    const details = await this.socialService.getFacebookDetails(body);

    const existedItem = await this.userService.findByFacebookId(details.id);

    console.log(existedItem);

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

  // @Mutation((returns) => User)
  // async signInGoogle(@Args('googleInput') body: GoogleInput) {
  //   return {
  //     id: 'user_id',
  //     username: 'user_name',
  //     email: 'user_email',
  //   };
  // }
}
