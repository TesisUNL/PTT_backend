export class CreateUserDto {
  userName?: string;
  role: string;
  email: string;
  authSocialToken?: string;
  password: string;
  isActive?: boolean;
  imageUrl?: string | null;
}

export class LoginDto {
  email: string;
  password: string;
}
