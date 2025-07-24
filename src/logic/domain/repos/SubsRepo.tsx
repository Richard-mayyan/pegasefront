import { GetMemberQuery } from "@/logic/application/usecases/manage_members/GetMemberSubs";
import { MemberRow, Subscription } from "../entities";
import { CreateSubInput } from "@/logic/application/usecases/manage_subscriptions/CreateSubUC";

export interface SubsRepo {
  createSub(data: Omit<CreateSubInput, "id">): Promise<MemberRow>;
  // D’autres méthodes plus tard (getAll, getById, etc.)
}
