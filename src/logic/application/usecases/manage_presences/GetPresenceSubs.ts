import { MemberRow, Presence, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";

export type GetPresenceQuery = {
  query?: string;
};

export class GetPresenceUC {
  constructor(private repo: MemberRepository) {}

  async execute(data: GetPresenceQuery): Promise<Presence[]> {
    return await this.repo.getPresences(data);
  }
}
