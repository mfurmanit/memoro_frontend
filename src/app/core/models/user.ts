export interface User {
  name: string;
  surname: string;
  username: string;
  fullName: string;
  email: string;
}

export interface UserRequest extends Omit<User, 'fullName'> {
  password: string;
}
