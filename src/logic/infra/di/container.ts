import { NodeAuthRepo } from "../repos/nodeapi/NodeAuthRepo";
import { BrowserLocalStorage } from "@/logic/interfaces/ILocalstorage";
import { IClassRepo } from "@/logic/domain/repos/ClassRepo";
import { NodeClassRepo } from "../repos/nodeapi/NodeClassRepo";
import { ICommunityRepo } from "@/logic/domain/repos/CommunityRepo";
import { NodeCommunityRepo } from "../repos/nodeapi/NodeCommunityRepo";
import { IChatRepo } from "@/logic/domain/repos/ChatRepo";
import { InMemoryChatRepo } from "../repos/inmemory/InMemoryChatRepo";
import { ICoachingsRepo } from "@/logic/domain/repos/CoachingsRepo";
import { InMemoryCoachingsRepo } from "../repos/inmemory/InMemoryCoachingsRepo";
import { IAuthRepo } from "@/logic/domain/repos/AuthRepo";
import { InMemoryClassRepo } from "../repos/inmemory/InMemoryClassRepo";
import { InMemoryCommunityRepo } from "../repos/inmemory/InMemoryCommunityRepo";
import { InMemoryAuthRepo } from "../repos/inmemory/InMemoryAuthRepo";
import { NodeChatRepo } from "../repos/nodeapi/NodeChatRepo";
import { NodeCoachingsRepo } from "../repos/nodeapi/NodeCoachingsRepo";
import { NodeChapterRepo } from "../repos/nodeapi/NodeChapterRepo";
import { IChapterRepo } from "@/logic/domain/repos/ChapterRepo";

const inMemoryDeps = {
  authRepo: new InMemoryAuthRepo(),
  classRepo: new InMemoryClassRepo(),
  communityRepo: new InMemoryCommunityRepo(),
  chatRepo: new InMemoryChatRepo(),
  coachingsRepo: new InMemoryCoachingsRepo(),
};
const nodeDeps = {
  authRepo: new NodeAuthRepo(),
  classRepo: new NodeClassRepo(),
  communityRepo: new NodeCommunityRepo(),
  chatRepo: new NodeChatRepo(),
  coachingsRepo: new NodeCoachingsRepo(),
  chapterRepo: new NodeChapterRepo(),
};

const appLocalStorage = new BrowserLocalStorage();
const {
  authRepo,
  classRepo,
  communityRepo,
  chatRepo,
  coachingsRepo,
  chapterRepo,
} = nodeDeps;
// const chatRepo: IChatRepo = new InMemoryChatRepo();
// const coachingsRepo: ICoachingsRepo = new InMemoryCoachingsRepo();

// Fonction pour récupérer les données sauvegardées
// export const getSavedData = async () => {
//   try {
//     const communities = await communityRepo.findAll();
//     return {
//       community: communities[0],
//     };
//     // const classes = await classRepo.findAll();

//     // if (communities.length > 0 && classes.length > 0) {
//     //   return {
//     //     community: communities[0],
//     //     // class: classes[0],
//     //   };
//     // }
//     return null;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données:", error);
//     return null;
//   }
// };

export {
  authRepo,
  appLocalStorage,
  classRepo,
  communityRepo,
  chatRepo,
  coachingsRepo,
  chapterRepo,
};

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
