import { User } from "../entities";

export interface UserRepo {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
