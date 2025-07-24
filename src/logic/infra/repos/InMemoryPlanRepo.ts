// import { v4 as uuidv4 } from "uuid";

import { CreatePlanInput } from "@/logic/application/usecases/manage_plans/CreatePlanUC";
import { GetPlanQuery } from "@/logic/application/usecases/manage_plans/GetPlansUC";
import { CreateSubInput } from "@/logic/application/usecases/manage_subscriptions/CreateSubUC";
import { Member, MemberRow, Plan, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { PlansRepository } from "@/logic/domain/repos/PlansRepo";
import { SubsRepo } from "@/logic/domain/repos/SubsRepo";

export class InMemoryPlanRepository implements PlansRepository {
  createPlan(data: CreatePlanInput): Promise<Plan> {
    throw new Error("Method not implemented.");
  }
  getPlans(data: GetPlanQuery): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }
}
