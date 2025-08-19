import { CreateUserDto } from "@/logic/infra/repos/nodeapi/dtos";
import { UserEntity } from "../entities";

export interface IUserRepo {
  create(data: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity>;
  // update(id: string, data: UpdateUserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
