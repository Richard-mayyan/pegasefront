// import { User } from "@/logic/domain/entities";
// import { AuthRepository } from "@/logic/domain/repos/AuthRepo";

import { RegisterPayload } from "@/logic/application/usecases/auth/RegisterUserUC";
import { isAdmin, ROLES, User } from "@/logic/domain/entities";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";
import { UserStorageService } from "./InMemoryUserRepo";

// export class InMemoryAuthRepository implements AuthRepository {
//   private users: User[] = [
//     {
//       id: "1",
//       email: "test@example.com",
//       name: "name",
//     },
//   ];

//   async login(email: string, password: string): Promise<User> {
//     const user = this.users.find((u) => u.email === email);
//     if (!user || password !== "password")
//       throw new Error("Invalid credentials");
//     return user;
//   }
// }

// const result = await new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("foo");
//   }, 3000);
// });

const usersStorage = new UserStorageService();

export class InMemoryAuthRepository implements AuthRepository {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.loadUsers();
  }
  async logout(): Promise<boolean> {
    await usersStorage.removeCurrentUser;
    return true;
  }

  async loadUsers() {
    const users = usersStorage.getUsers();
    this.users = [...users];

    console.log("this.users ", this.users);

    const d = usersStorage.getCurrentUser();
    this.currentUser = d;
  }

  async login(email: string, password: string): Promise<User> {
    console.log("actual users ", this.users);
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Invalid credentials");
    this.currentUser = user;

    usersStorage.setCurrentUser(user);
    // userStorage.(newUser)

    return user;
  }

  async register(user: RegisterPayload): Promise<User> {
    let roles: ROLES[] = [];

    if (user.email.includes("admin")) {
      roles.push(ROLES.Admin);
    }
    if (user.email.includes("coach")) {
      roles.push(ROLES.Coach);
    }
    if (user.email.includes("receptionist")) {
      roles.push(ROLES.Receptionist);
    }

    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2),
      createdAt: new Date(),
      updatedAt: new Date(),
      roles,
      // isAdmin: user.email.includes("admin"),
      profilePic: "",
    };
    this.users.push(newUser);

    usersStorage.saveUser(newUser);
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = this.users.find((u) => u.email === email);
    if (!user) throw new Error("User not found");
    // Simuler l'envoi d'un email de réinitialisation
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    user.password = newPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }
}
