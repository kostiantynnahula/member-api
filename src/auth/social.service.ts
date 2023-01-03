import { Injectable } from '@nestjs/common';
import { FacebookInput } from './inputs/facebook.input';
import * as fb from 'fb';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

export interface FacebookDetails {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class SocialService {
  public facebookFields = ['id', 'email', 'name'];

  async getFacebookDetails(input: FacebookInput): Promise<FacebookDetails> {
    const { accessToken, id } = input;

    fb.setAccessToken(accessToken);

    const details = (await fb.api(id, {
      fields: this.facebookFields,
    })) as FacebookDetails;

    return details;
  }

  async getGoogleDetails(token: string): Promise<TokenPayload> {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );

    const details = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return details.getPayload();
  }
}
