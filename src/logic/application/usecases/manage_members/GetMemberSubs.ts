import { MemberRow, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";

export type GetMemberQuery = {
  query?: string;
};

export class GetMemberSubsUC {
  constructor(private clientRepo: MemberRepository) {}

  async execute(data: GetMemberQuery): Promise<Subscription[]> {
    return await this.clientRepo.getMemberSubs(data);
  }
}
