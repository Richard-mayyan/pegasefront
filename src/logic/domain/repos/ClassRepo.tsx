import {
  CreateClassDto,
  UpdateClassDto,
} from "@/logic/infra/repos/nodeapi/dtos";
import { ClassEntity } from "../entities";

export interface IClassRepo {
  create(data: CreateClassDto): Promise<ClassEntity>;
  findAll(communityId: string): Promise<ClassEntity[]>;
  findOne(id: string): Promise<ClassEntity>;
  update(id: string, data: UpdateClassDto): Promise<ClassEntity>;
  delete(id: string): Promise<void>;
}
