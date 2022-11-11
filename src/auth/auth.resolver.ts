import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from './../users/models/user.model';
import { ProfileInput } from './inputs/profile.input';
import { GoogleInput } from './inputs/google.input';
import { FacebookInput } from './inputs/facebook.input';
import { UsersService } from './../users/users.service';

@Resolver(of => User)
export class AuthResolver {

  constructor(
    private userService: UsersService
  ) {}

  @Query(returns => User)
  async profile() {
    return {
      id: 'user_id',
      username: 'user_name',
      email: 'user_email',
    }
  }

  @Mutation(returns => User)
  async updateProfile(
    @Args('profileInput') body: ProfileInput
  ) {

    const { username, email } = body;

    return {
      id: 'user_id',
      username: username || 'user_name',
      email: email || 'user_email',
    }
  }

  @Mutation(returns => User)
  async signInFacebook(
    @Args('facebookInput') body: FacebookInput,
  ) {
    return {
      id: 'user_id',
      username: 'user_name',
      email: 'user_email',
    }
  }

  @Mutation(returns => User)
  async signInGoogle(
    @Args('googleInput') body: GoogleInput,
  ) {
    return {
      id: 'user_id',
      username: 'user_name',
      email: 'user_email',
    }
  }
}