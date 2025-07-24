import { UserRepo } from "@/logic/domain/repos/UserRepo";
import { InMemoryUserRepo } from "../repos/InMemoryUserRepo";
import { GetUsersUC } from "@/logic/application/usecases/GetUsersUC";
import { LoginUserUseCase } from "@/logic/application/usecases/auth/LoginUserUC";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";
import { InMemoryAuthRepository } from "../repos/InMemoryAuthRepo";
import { RegisterUserUseCase } from "@/logic/application/usecases/auth/RegisterUserUC";
import { BrowserLocalStorage } from "@/logic/interfaces/ILocalstorage";
import { LogoutUsecase } from "@/logic/application/usecases/auth/LogoutUC";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";
import { InMemoryMemberRepository } from "../repos/InMemoryClientRepo";
import { CreateMemberUseCase } from "@/logic/application/usecases/manage_members/CreateMemberUC";
import { GetMemberSubsUC } from "@/logic/application/usecases/manage_members/GetMemberSubs";
import { SubsRepo } from "@/logic/domain/repos/SubsRepo";
import { InMemorySubRepository } from "../repos/InMemorySubRepo";
import { CreateSubUC } from "@/logic/application/usecases/manage_subscriptions/CreateSubUC";
import { PlansRepository } from "@/logic/domain/repos/PlansRepo";
import { InMemoryPlanRepository } from "../repos/InMemoryPlanRepo";
import { GetPresenceUC } from "@/logic/application/usecases/manage_presences/GetPresenceSubs";
import { GetPlansUC } from "@/logic/application/usecases/manage_plans/GetPlansUC";
import { CreatePlanUseCase } from "@/logic/application/usecases/manage_plans/CreatePlanUC";
import { GetStatsUC } from "@/logic/application/usecases/dashboard/GetStatsUC";
import { StatsRepo } from "@/logic/domain/repos/StatsRepo";
import { InMemoryStatRepository } from "../repos/InMemoryStatRepo";

// Repos
const userRepo: UserRepo = new InMemoryUserRepo();
const authRepo: AuthRepository = new InMemoryAuthRepository();
const membersRepo: MemberRepository = new InMemoryMemberRepository();
const subsRepo: SubsRepo = new InMemorySubRepository();
const plansRepo: PlansRepository = new InMemoryPlanRepository();
const statsRepo: StatsRepo = new InMemoryStatRepository();
// InFra
const appLocalStorage = new BrowserLocalStorage();

// Use cases
//AUTH
const loginUC = new LoginUserUseCase(authRepo);
const registerUC = new RegisterUserUseCase(authRepo);
const logoutUC = new LogoutUsecase(authRepo);

// Members
const createMemberUC = new CreateMemberUseCase(membersRepo);
const getMemberSubsUC = new GetMemberSubsUC(membersRepo);
const getUsersUC = new GetUsersUC(userRepo);

// Subscriptions
const createSubUC = new CreateSubUC(subsRepo);

// Presences
const getPresencesUC = new GetPresenceUC(membersRepo);

// Plan
const getPlansUC = new GetPlansUC(plansRepo);
const createPlanUC = new CreatePlanUseCase(plansRepo);

// Dashboard

const getStatsUC = new GetStatsUC(statsRepo);
const USE_CASES = {
  auth: {
    loginUC,
    registerUC,
    logoutUC,
  },
  members: {
    createMemberUC,
    getMemberSubsUC,
    getUsersUC,
  },
  subs: {
    createSubUC,
  },
  presences: {
    getPresencesUC,
  },
  plans: {
    getPlansUC,
    createPlanUC,
  },
  dashboard: {
    getStatsUC,
  },
};

export { USE_CASES, authRepo };

// export {
//   userRepo,
//   authRepo,
//   membersRepo,
//   getUsersUC,
//   createMemberUC,
//   loginUC,
//   registerUC,
//   appLocalStorage,
//   logoutUC,
//   getMemberSubsUC,
//   createSubUC,
//   getPlansUC,
//   createPlanUC,
// };
