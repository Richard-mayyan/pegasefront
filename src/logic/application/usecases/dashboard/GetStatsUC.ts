import { MemberRow, Plan, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { PlansRepository } from "@/logic/domain/repos/PlansRepo";
import { StatsRepo } from "@/logic/domain/repos/StatsRepo";

export type GetStatQuery = {
  query?: string;
};

export type DashboardStats = {
  total_active_members: number;
  expiring_subs: number;
  today_presences: number;
  new_clients: number;
};

export class GetStatsUC {
  constructor(private repo: StatsRepo) {}

  async execute(data: GetStatQuery): Promise<DashboardStats> {
    return await this.repo.getDashboardStats(data);
  }
}
