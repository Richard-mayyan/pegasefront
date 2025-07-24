import { UserRepo } from "@/logic/domain/repos/UserRepo";

export class GetUsersUC {
  constructor(private userRepo: UserRepo) {}

  async execute() {
    return await this.userRepo.getAll();
  }
}
