import { NoteEntity } from "../entities";

export interface INoteRepo {
  getNotesByLessonId(lessonId: string): Promise<NoteEntity[]>;
  getNoteById(noteId: string): Promise<NoteEntity>;
  updateNote(noteId: string, data: Partial<NoteEntity>): Promise<NoteEntity>;
  deleteNote(noteId: string): Promise<void>;
}
