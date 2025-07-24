import { User } from "@/logic/domain/entities";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// export type RegisterPayload = Omit<
//   User,
//   "id" | "createdAt" | "updatedAt" | "password"
// >;

export class RegisterUserUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(payload: RegisterPayload): Promise<User> {
    return this.authRepo.register(payload);
  }
}
