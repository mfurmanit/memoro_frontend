import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

export const guards = [
  AuthGuard,
  LoginGuard
];

export * from './auth.guard';
export * from './login.guard';
