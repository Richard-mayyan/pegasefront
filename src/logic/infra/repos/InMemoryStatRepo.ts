// import { v4 as uuidv4 } from "uuid";

import {
  GetStatQuery,
  DashboardStats,
} from "@/logic/application/usecases/dashboard/GetStatsUC";
import { CreatePlanInput } from "@/logic/application/usecases/manage_plans/CreatePlanUC";
import { GetPlanQuery } from "@/logic/application/usecases/manage_plans/GetPlansUC";
import { CreateSubInput } from "@/logic/application/usecases/manage_subscriptions/CreateSubUC";
import { Member, MemberRow, Plan, Subscription } from "@/logic/domain/entities";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { PlansRepository } from "@/logic/domain/repos/PlansRepo";
import { StatsRepo } from "@/logic/domain/repos/StatsRepo";
import { SubsRepo } from "@/logic/domain/repos/SubsRepo";

export class InMemoryStatRepository implements StatsRepo {
  getDashboardStats(data: GetStatQuery): Promise<DashboardStats> {
    const a: DashboardStats = {
      total_active_members: 120,
      expiring_subs: 22,
      today_presences: 4545,
      new_clients: 10,
    };
    return Promise.resolve(a);
  }
}
