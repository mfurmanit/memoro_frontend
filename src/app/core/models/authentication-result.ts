import { User } from './user';

export interface AuthenticationResult {
  user: User;
  redirectUrl?: string;
}
