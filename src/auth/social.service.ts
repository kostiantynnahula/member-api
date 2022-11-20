import { Injectable } from '@nestjs/common';
import { FacebookInput } from './inputs/facebook.input';
import * as fb from 'fb';

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
}
