import { GetMemberQuery } from "@/logic/application/usecases/manage_members/GetMemberSubs";
import { MemberRow, Presence, Subscription } from "../entities";
import { GetPresenceQuery } from "@/logic/application/usecases/manage_presences/GetPresenceSubs";

export interface MemberRepository {
  createMember(data: Omit<MemberRow, "id">): Promise<MemberRow>;
  getMemberSubs(data: GetMemberQuery): Promise<Subscription[]>;
  getPresences(data: GetPresenceQuery): Promise<Presence[]>;
  // D’autres méthodes plus tard (getAll, getById, etc.)
}
