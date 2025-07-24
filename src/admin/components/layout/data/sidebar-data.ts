import {
  Ban as IconBarrierBlock,
  CheckCheck as IconBrowserCheck,
  Bug as IconBug,
  ListChecks as IconChecklist,
  FileX as IconError404,
  HelpCircle as IconHelp,
  LayoutDashboard as IconLayoutDashboard,
  Lock as IconLock,
  ShieldCheck as IconLockAccess,
  MessagesSquare as IconMessages,
  Bell as IconNotification,
  Boxes as IconPackages,
  Palette as IconPalette,
  ServerOff as IconServerOff,
  Settings as IconSettings,
  Wrench as IconTool,
  UserCog as IconUserCog,
  UserX as IconUserOff,
  Users as IconUsers,
  Users2Icon,
} from "lucide-react";

import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { type SidebarData } from "../types";
import { User } from "@/logic/domain/entities";
import { ROUTES } from "@/lib/constants";
import trad from "../../../../../i18n";
import { getFullName } from "@/lib/utils";

export const getsidebarData = (user: User): SidebarData => {
  return {
    user: {
      name: getFullName(user),
      email: user.email,
      avatar: user.profilePic,
    },

    navGroups: [
      {
        title: trad.t("sidebar.general"),
        items: [
          {
            title: trad.t("sidebar.dashboard"),
            url: "/dashboard",
            icon: IconLayoutDashboard,
          },
          {
            title: trad.t("sidebar.members"),
            url: ROUTES.members,
            icon: Users2Icon,
          },
          {
            title: trad.t("sidebar.subscriptions"),
            url: ROUTES.subscriptions,
            icon: Users2Icon,
          },
          {
            title: trad.t("sidebar.apps"),
            url: "/apps",
            icon: IconPackages,
          },
        ],
      },
      {
        title: trad.t("sidebar.other"),
        items: [
          {
            title: trad.t("sidebar.settings.title"),
            icon: IconSettings,
            items: [
              {
                title: trad.t("sidebar.settings.profile"),
                url: "/settings",
                icon: IconUserCog,
              },
              {
                title: trad.t("sidebar.settings.account"),
                url: "/settings/account",
                icon: IconTool,
              },
              {
                title: trad.t("sidebar.settings.appearance"),
                url: "/settings/appearance",
                icon: IconPalette,
              },
              {
                title: trad.t("sidebar.settings.notifications"),
                url: "/settings/notifications",
                icon: IconNotification,
              },
              {
                title: trad.t("sidebar.settings.display"),
                url: "/settings/display",
                icon: IconBrowserCheck,
              },
            ],
          },
          {
            title: trad.t("sidebar.helpCenter"),
            url: "/help-center",
            icon: IconHelp,
          },
        ],
      },
    ],
  };
};

// export const getsidebarData = (user: User): SidebarData => {
//   return {
//     user: {
//       name: user.lastName,
//       email: user.email,
//       avatar: user.profilePic,
//     },
//     teams: [
//       {
//         name: "Acme Corp.",
//         logo: AudioWaveform,
//         plan: "Startup",
//       },
//     ],
//     navGroups: [
//       {
//         title: "General",
//         items: [
//           {
//             title: "Dashboard",
//             url: "/dashboard",
//             icon: IconLayoutDashboard,
//           },
//           {
//             title: "Membres",
//             url: ROUTES.members,
//             icon: Users2Icon,
//           },

//           {
//             title: "Apps",
//             url: "/apps",
//             icon: IconPackages,
//           },
//         ],
//       },

//       {
//         title: "Autres",
//         items: [
//           {
//             title: "Paramètres",
//             icon: IconSettings,
//             items: [
//               {
//                 title: "Profile",
//                 url: "/settings",
//                 icon: IconUserCog,
//               },
//               {
//                 title: "Account",
//                 url: "/settings/account",
//                 icon: IconTool,
//               },
//               {
//                 title: "Appearance",
//                 url: "/settings/appearance",
//                 icon: IconPalette,
//               },
//               {
//                 title: "Notifications",
//                 url: "/settings/notifications",
//                 icon: IconNotification,
//               },
//               {
//                 title: "Display",
//                 url: "/settings/display",
//                 icon: IconBrowserCheck,
//               },
//             ],
//           },
//           {
//             title: "Centre d'aide",
//             url: "/help-center",
//             icon: IconHelp,
//           },
//         ],
//       },
//     ],
//   };
// };
