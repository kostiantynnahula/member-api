import { InviteType } from './../models/invites';

export interface CreateInvitePayload {
  from: string;
  to: string;
  organization: string;
  type: InviteType;
}
