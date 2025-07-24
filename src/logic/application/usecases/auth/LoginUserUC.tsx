import { User } from "@/logic/domain/entities";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";

export class LoginUserUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    return this.authRepo.login(email, password);
  }
}
