import { CreateChapterDto } from "@/logic/infra/repos/nodeapi/dtos";
import { ChapterEntity } from "../entities";

export interface IChapterRepo {
  create(data: CreateChapterDto): Promise<ChapterEntity>;
  findAll(): Promise<ChapterEntity[]>;
  findOne(id: string): Promise<ChapterEntity>;
  update(id: string, data: any): Promise<ChapterEntity>;
  delete(id: string): Promise<void>;
}
