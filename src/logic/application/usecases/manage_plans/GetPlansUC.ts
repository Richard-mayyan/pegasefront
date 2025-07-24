import { MemberRow, Plan, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { PlansRepository } from "@/logic/domain/repos/PlansRepo";

export type GetPlanQuery = {
  query?: string;
};

export class GetPlansUC {
  constructor(private repo: PlansRepository) {}

  async execute(data: GetPlanQuery): Promise<Plan[]> {
    return await this.repo.getPlans(data);
  }
}
