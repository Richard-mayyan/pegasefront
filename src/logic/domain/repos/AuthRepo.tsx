import { UserEntity } from "@/logic/domain/entities";
import { RegisterDto, UserDto } from "@/logic/infra/repos/nodeapi/dtos";

export interface LoginResult {
  access_token: string;
  user: UserEntity;
}

export interface ConfirmAccountDto {
  email: string;
  code: string;
}

export interface ResendCodeDto {
  email: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  code: string;
  password: string;
}

export interface IAuthRepo {
  login(data: { email: string; password: string }): Promise<LoginResult>;
  // login(data: LoginDto): Promise<UserDto>;
  register(data: RegisterDto): Promise<UserEntity>;
  confirmAccountWithCode(data: ConfirmAccountDto): Promise<LoginResult>;
  resendCode(data: ResendCodeDto): Promise<void>;
  forgotPassword(data: ForgotPasswordDto): Promise<void>;
  resetPassword(data: ResetPasswordDto): Promise<void>;
  getProfile(): Promise<UserEntity>;
  getCurrentUser(): Promise<UserEntity>;
}
