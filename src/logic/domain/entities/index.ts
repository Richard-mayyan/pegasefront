import { GENDERS, User } from "./User";

// export type Client = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   photoUrl?: string;
// };

export interface Plan {
  name: string;
}

export interface Presence {
  userId: string;
}

export interface Subscription {
  userId: string;
}

export interface Member {
  user: Partial<User>;
  membershipStatus: "active" | "inactive" | "pending";
  membershipType: "monthly" | "yearly" | "drop-in";
  joinedAt: Date;
}

export interface MemberRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  gender: GENDERS;

  membershipStatus: "active" | "inactive" | "pending";
  membershipType: "monthly" | "yearly" | "drop-in";
  joinedAt: Date;
}

export * from "./User";
