export interface AuthLoginType {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export class AuthLoginDto {
  email: string | undefined;
  password: string | undefined;
  rememberMe?: boolean = true;
}
