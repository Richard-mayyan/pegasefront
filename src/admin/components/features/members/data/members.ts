// import { Member, User } from "@/logic/domain/entities";

import { GENDERS, MemberRow } from "@/logic/domain/entities";

// const u1: Partial<User> = {
//   id: "1",
//   firstName: "Premier",
//   lastName: "Famille",
//   email: "jean.martin@example.com",
// };

// const u2: Partial<User> = {
//   id: "2",
//   firstName: "Deuxieme",
//   lastName: "Famil",
//   email: "Deuxieme.dd@example.com",
// };

// const u3: Partial<User> = {
//   id: "3",
//   firstName: "Troisieme",
//   lastName: "FAlJ",
//   email: "Troisieme.aaa@example.com",
// };
// export const members: Member[] = [
//   {
//     user: u1,
//     membershipStatus: "active",
//     membershipType: "monthly",
//     joinedAt: new Date("2024-01-15"),
//   },
//   {
//     user: u1,

//     membershipStatus: "inactive",
//     membershipType: "yearly",
//     joinedAt: new Date("2023-07-01"),
//   },
//   {
//     user: u1,
//     membershipStatus: "pending",
//     membershipType: "drop-in",
//     joinedAt: new Date("2025-05-10"),
//   },
// ];

export const members: MemberRow[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Dupont",
    email: "alice.dupont@example.com",
    membershipStatus: "active",
    membershipType: "monthly",
    joinedAt: new Date("2024-01-15"),
    profilePic: "",
    gender: GENDERS.Male,
  },
  {
    id: "2",
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@example.com",
    membershipStatus: "inactive",
    membershipType: "yearly",
    joinedAt: new Date("2023-07-01"),
    profilePic: "",
    gender: GENDERS.Male,
  },
  {
    id: "3",
    firstName: "Sophie",
    lastName: "Lemoine",
    email: "sophie.lemoine@example.com",
    membershipStatus: "pending",
    membershipType: "drop-in",
    joinedAt: new Date("2025-05-10"),
    profilePic: "",
    gender: GENDERS.Male,
  },
];
