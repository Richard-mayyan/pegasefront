import { INoteRepo } from "@/logic/domain/repos/NoteRepo";
import { apiClient } from "./axios";
import { NoteEntity } from "@/logic/domain/entities";

export class NodeNoteRepo implements INoteRepo {
  async getNotesByLessonId(lessonId: string): Promise<NoteEntity[]> {
    const { data } = await apiClient.get(`/lessons/${lessonId}/notes`);
    return data;
  }

  async getNoteById(noteId: string): Promise<NoteEntity> {
    const { data } = await apiClient.get(`/notes/${noteId}`);
    return data;
  }

  async updateNote(
    noteId: string,
    payload: Partial<NoteEntity>
  ): Promise<NoteEntity> {
    const { data } = await apiClient.patch(`/notes/${noteId}`, payload);
    return data;
  }

  async deleteNote(noteId: string): Promise<void> {
    await apiClient.delete(`/notes/${noteId}`);
  }
}
