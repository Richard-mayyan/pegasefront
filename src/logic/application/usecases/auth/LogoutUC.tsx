import { User } from "@/logic/domain/entities";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";

export class LogoutUsecase {
  constructor(private authRepo: AuthRepository) {}

  async execute() {
    return this.authRepo.logout();
  }
}
