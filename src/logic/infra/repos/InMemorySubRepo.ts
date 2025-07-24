// import { v4 as uuidv4 } from "uuid";

import { GetMemberQuery } from "@/logic/application/usecases/manage_members/GetMemberSubs";
import { CreateSubInput } from "@/logic/application/usecases/manage_subscriptions/CreateSubUC";
import { Member, MemberRow, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { SubsRepo } from "@/logic/domain/repos/SubsRepo";

export class InMemorySubRepository implements SubsRepo {
  createSub(data: Omit<CreateSubInput, "id">): Promise<MemberRow> {
    throw new Error("Method not implemented.");
  }
}
