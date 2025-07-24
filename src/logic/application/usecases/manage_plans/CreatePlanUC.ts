import { MemberRow, Plan } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { PlansRepository } from "@/logic/domain/repos/PlansRepo";

export type CreatePlanInput = Omit<MemberRow, "id">;

export class CreatePlanUseCase {
  constructor(private repo: PlansRepository) {}

  async execute(data: CreatePlanInput): Promise<Plan> {
    return await this.repo.createPlan(data);
  }
}
