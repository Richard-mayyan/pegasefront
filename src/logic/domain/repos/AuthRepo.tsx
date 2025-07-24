import { RegisterPayload } from "@/logic/application/usecases/auth/RegisterUserUC";
import { User } from "../entities/User";

// export interface AuthRepository {
//   login(email: string, password: string): Promise<User>;
// }

export interface AuthRepository {
  logout(): Promise<boolean>;
  login(email: string, password: string): Promise<User>;
  register(user: RegisterPayload): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  forgotPassword(email: string): Promise<void>;
  changePassword(userId: string, newPassword: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
