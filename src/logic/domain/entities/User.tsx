export enum GENDERS {
  Male = "Male",
  Female = "Female",
}

export enum ROLES {
  Admin = "Admin",
  Coach = "Coach",
  Receptionist = "Receptionist",
}

export function hasRole(user: User, role: ROLES): boolean {
  return user.roles.includes(role);
}

export function isAdmin(user: User): boolean {
  return hasRole(user, ROLES.Admin);
}

export function isCoach(user: User): boolean {
  return hasRole(user, ROLES.Coach);
}

export function isReceptionist(user: User): boolean {
  return hasRole(user, ROLES.Receptionist);
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  profilePic: string;

  roles: ROLES[];
  gender: GENDERS;

  createdAt: Date;
  updatedAt: Date;
}
