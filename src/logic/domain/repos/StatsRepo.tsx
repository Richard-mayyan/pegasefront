import {
  DashboardStats,
  GetStatQuery,
} from "@/logic/application/usecases/dashboard/GetStatsUC";
import { MemberRow, Plan, Presence, Subscription } from "../entities";
import { CreatePlanInput } from "@/logic/application/usecases/manage_plans/CreatePlanUC";

export interface StatsRepo {
  getDashboardStats(data: GetStatQuery): Promise<DashboardStats>;
  // D’autres méthodes plus tard (getAll, getById, etc.)
}
