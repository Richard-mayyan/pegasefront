import { IUserRepo } from "@/logic/domain/repos/UserRepo";
import { apiClient } from "./axios";
import { CreateUserDto } from "./dtos";
import { UserEntity } from "@/logic/domain/entities";

export class NodeUserRepo implements IUserRepo {
  async create(data: CreateUserDto): Promise<UserEntity> {
    const res = await apiClient.post("/users", data);
    return res.data;
  }

  async findAll(): Promise<UserEntity[]> {
    const res = await apiClient.get("/users");
    return res.data;
  }

  async findOne(id: string): Promise<UserEntity> {
    const res = await apiClient.get(`/users/${id}`);
    return res.data;
  }

  //   async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
  //     const res = await apiClient.patch(`/users/${id}`, data);
  //     return res.data;
  //   }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}
