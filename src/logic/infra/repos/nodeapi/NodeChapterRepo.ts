import { IChapterRepo } from "@/logic/domain/repos/ChapterRepo";
import { CreateChapterDto } from "./dtos";
import { apiClient } from "./axios";
import { ChapterEntity } from "@/logic/domain/entities";

export class NodeChapterRepo implements IChapterRepo {
  async create(data: CreateChapterDto): Promise<ChapterEntity> {
    const res = await apiClient.post("/chapters", data);
    return res.data;
  }

  async findAll(): Promise<ChapterEntity[]> {
    const res = await apiClient.get("/chapters");
    return res.data;
  }

  async findOne(id: string): Promise<ChapterEntity> {
    const res = await apiClient.get(`/chapters/${id}`);
    return res.data;
  }

  async update(id: string, data: any): Promise<ChapterEntity> {
    const res = await apiClient.patch(`/chapters/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/chapters/${id}`);
  }
}
