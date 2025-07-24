import { MemberRow, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { SubsRepo } from "@/logic/domain/repos/SubsRepo";

export type CreateSubInput = Omit<Subscription, "id">;

export class CreateSubUC {
  constructor(private subRepo: SubsRepo) {}

  async execute(data: CreateSubInput): Promise<MemberRow> {
    return await this.subRepo.createSub(data);
  }
}
