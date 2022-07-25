export class CreateUserDto {
  name: string;
  role: string;
  email: string;
  authSocialToken?: string;
  password: string;
  isActive?: boolean;
  imageUrl?: string | null;
  phone_number?: string | null;
}

export class LoginDto {
  email: string;
  password: string;
}
