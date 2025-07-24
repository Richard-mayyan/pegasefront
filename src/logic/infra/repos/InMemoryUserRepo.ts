import { User } from "@/logic/domain/entities";
import { UserRepo } from "@/logic/domain/repos/UserRepo";
import { appLocalStorage } from "../di/container";
import {
  BrowserLocalStorage,
  ILocalStorage,
} from "@/logic/interfaces/ILocalstorage";

export class UserStorageService {
  private readonly storageKey = "users"; // Changé pour refléter une liste
  private readonly currentUserKey = "currentUserKey"; // Changé pour refléter une liste
  private storage: ILocalStorage;

  constructor() {
    this.storage = new BrowserLocalStorage();
  }

  // Récupère tous les utilisateurs
  getUsers(): User[] {
    const usersJson = this.storage.getItem(this.storageKey);
    if (!usersJson) return [];

    try {
      const users = JSON.parse(usersJson) as User[];
      // Convertir les dates string en objets Date
      return users.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }));
    } catch (error) {
      console.error("Error parsing users from localStorage", error);
      return [];
    }
  }

  // Ajoute ou met à jour un utilisateur
  saveUser(user: User): void {
    const users = this.getUsers();
    const existingUserIndex = users.findIndex((u) => u.id === user.id);

    if (existingUserIndex >= 0) {
      // Mise à jour si l'utilisateur existe déjà
      users[existingUserIndex] = user;
    } else {
      // Ajout d'un nouvel utilisateur
      users.push(user);
    }

    this.storage.setItem(this.storageKey, JSON.stringify(users));
  }

  setCurrentUser(user: User) {
    this.storage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  removeCurrentUser() {
    this.storage.removeItem(this.currentUserKey);
  }
  // Récupérer un utilisateur
  getCurrentUser(): User | null {
    const userJson = this.storage.getItem(this.currentUserKey);
    if (!userJson) return null;

    try {
      const user = JSON.parse(userJson) as User;
      // Convertir les dates string en objets Date
      user.createdAt = new Date(user.createdAt);
      user.updatedAt = new Date(user.updatedAt);
      return user;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  }

  // Supprime un utilisateur par son ID
  removeUser(userId: string): void {
    const users = this.getUsers().filter((user) => user.id !== userId);
    this.storage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Vide toute la liste
  clearUsers(): void {
    this.storage.removeItem(this.storageKey);
  }
}

const usersStorage = new UserStorageService();

export class InMemoryUserRepo implements UserRepo {
  private users: User[] = [];

  constructor() {}

  async loadUsers() {
    const users = usersStorage.getUsers();
    // const result = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("foo");
    //   }, 3000);
    // });

    this.users = [...users];
  }

  async getAll() {
    await this.loadUsers();
    return this.users;
  }

  async getById(id: string) {
    return this.users.find((u) => u.id === id) || null;
  }

  async save(user: User) {
    this.users.push(user);
  }

  async delete(id: string) {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
