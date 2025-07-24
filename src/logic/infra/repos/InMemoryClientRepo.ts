// import { v4 as uuidv4 } from "uuid";

import { GetMemberQuery } from "@/logic/application/usecases/manage_members/GetMemberSubs";
import { GetPresenceQuery } from "@/logic/application/usecases/manage_presences/GetPresenceSubs";
import {
  Member,
  MemberRow,
  Presence,
  Subscription,
} from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";

export class InMemoryMemberRepository implements MemberRepository {
  getPresences(data: GetPresenceQuery): Promise<Presence[]> {
    throw new Error("Method not implemented.");
  }
  getMemberSubs(data: GetMemberQuery): Promise<Subscription[]> {
    const subscriptions: Subscription[] = [
      {
        userId: "FIRSTSSS",
      },
      {
        userId: "SECONDNDNODN",
      },
    ];
    return Promise.resolve(subscriptions);
  }
  private members: MemberRow[] = [];

  async createMember(data: Omit<MemberRow, "id">): Promise<MemberRow> {
    const newId = Date.now().toLocaleString();
    const client: MemberRow = { id: newId, ...data };
    this.members.push(client);
    return client;
  }
}
