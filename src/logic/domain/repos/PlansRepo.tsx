import { MemberRow, Plan, Presence, Subscription } from "../entities";
import { CreatePlanInput } from "@/logic/application/usecases/manage_plans/CreatePlanUC";
import { GetPlanQuery } from "@/logic/application/usecases/manage_plans/GetPlansUC";

export interface PlansRepository {
  createPlan(data: CreatePlanInput): Promise<Plan>;
  getPlans(data: GetPlanQuery): Promise<Plan[]>;
  // D’autres méthodes plus tard (getAll, getById, etc.)
}
