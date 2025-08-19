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

export interface IAuthRepo {
  login(data: { email: string; password: string }): Promise<LoginResult>;
  // login(data: LoginDto): Promise<UserDto>;
  register(data: RegisterDto): Promise<UserEntity>;
  confirmAccountWithCode(data: ConfirmAccountDto): Promise<UserEntity>;
  getProfile(): Promise<UserEntity>;
  getCurrentUser(): Promise<UserEntity>;
}
