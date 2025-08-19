import { IClassRepo } from "@/logic/domain/repos/ClassRepo";
import { ClassEntity } from "@/logic/domain/entities";
import {
  CreateClassDto,
  UpdateClassDto,
} from "@/logic/infra/repos/nodeapi/dtos";

export class InMemoryClassRepo implements IClassRepo {
  private classes: ClassEntity[] = [];
  private readonly storageKey = "pegas_classes";

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === "undefined") return; // Côté serveur

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.classes = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des classes:", error);
      this.classes = [];
    }
  }

  private saveToStorage() {
    if (typeof window === "undefined") return; // Côté serveur

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.classes));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des classes:", error);
    }
  }

  async create(data: CreateClassDto): Promise<ClassEntity> {
    const newClass: ClassEntity = {
      id: this.classes.length + 1,
      name: data.name,
      description: data.description,
      cover: data.cover,
      profil: data.profil,
      color: data.color,
      content: data.content,
      chapters:
        data.chapters?.map((chapter, index) => ({
          id: Date.now() + index + Math.random(),
          name: chapter.name,
          active: chapter.active,
          publishedAt: chapter.publishedAt,
          lessons:
            chapter.lessons?.map((lesson, lessonIndex) => ({
              id: Date.now() + lessonIndex + Math.random(),
              title: lesson.title,
              type: lesson.type,
              publishedAt: lesson.publishedAt,
              content: lesson.content,
              transcription: undefined,
              notes: [],
            })) || [],
        })) || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.classes.push(newClass);
    this.saveToStorage();
    return newClass;
  }

  async findAll(): Promise<ClassEntity[]> {
    return [...this.classes];
  }

  async findOne(id: string): Promise<ClassEntity> {
    const foundClass = this.classes.find((c) => c.id?.toString() === id);
    if (!foundClass) {
      throw new Error(`Class with id ${id} not found`);
    }
    return foundClass;
  }

  async update(id: string, data: UpdateClassDto): Promise<ClassEntity> {
    const index = this.classes.findIndex((c) => c.id?.toString() === id);
    if (index === -1) {
      throw new Error(`Class with id ${id} not found`);
    }

    // Traiter les chapitres et leçons si fournis
    let updatedChapters = this.classes[index].chapters;
    if (data.chapters) {
      updatedChapters = data.chapters.map((chapter, chapterIndex) => ({
        id: Date.now() + chapterIndex + Math.random(),
        name: chapter.name,
        active: chapter.active,
        publishedAt: chapter.publishedAt,
        lessons:
          chapter.lessons?.map((lesson, lessonIndex) => ({
            id: Date.now() + lessonIndex + Math.random(),
            title: lesson.title,
            type: lesson.type,
            publishedAt: lesson.publishedAt,
            content: lesson.content,
            transcription: undefined,
            notes: [],
          })) || [],
      }));
    }

    this.classes[index] = {
      ...this.classes[index],
      ...data,
      chapters: updatedChapters,
      updatedAt: new Date().toISOString(),
    };

    this.saveToStorage();
    return this.classes[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.classes.findIndex((c) => c.id?.toString() === id);
    if (index === -1) {
      throw new Error(`Class with id ${id} not found`);
    }

    this.classes.splice(index, 1);
    this.saveToStorage();
  }
}
