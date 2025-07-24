import { MemberRow } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";

export type CreateMemberInput = Omit<MemberRow, "id">;

export class CreateMemberUseCase {
  constructor(private clientRepo: MemberRepository) {}

  async execute(data: CreateMemberInput): Promise<MemberRow> {
    return await this.clientRepo.createMember(data);
  }
}
