import { IClassRepo } from "@/logic/domain/repos/ClassRepo";
import { ClassEntity } from "@/logic/domain/entities";
import { apiClient } from "./axios";
import {
  CreateClassDto,
  UpdateClassDto,
  ClassResponseDto,
  ClassListResponseDto,
  ClassSingleResponseDto,
} from "./dtos";

export class NodeClassRepo implements IClassRepo {
  private mapResponseToEntity(response: ClassResponseDto): ClassEntity {
    return {
      progression: response.progression,
      id: response.id,
      name: response.name,
      description: response.description,
      cover: response.thumbnail,
      profil: response.profil,
      color: response.color,
      chapters:
        response.chapters?.map((chapter) => ({
          id: chapter.id,
          name: chapter.name,
          active: chapter.active,
          publishedAt: chapter.publishedAt,
          lessons:
            chapter.lessons?.map((lesson) => ({
              progression: lesson.progression,
              id: lesson.id,
              title: lesson.title,
              type: lesson.type,
              publishedAt: lesson.publishedAt,
              transcription: undefined,
              notes: [],
            })) || [],
        })) || [],
      community: response.community,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  async create(
    data: CreateClassDto & { communityId: string; thumbnailFile?: File | null }
  ): Promise<ClassEntity> {
    try {
      console.log("Tentative de création de classe avec:", data);

      // Récupérer la communauté sélectionnée depuis le localStorage si non fournie
      const selectedCommunityId = data.communityId;

      if (!selectedCommunityId) {
        throw new Error("Aucune communauté sélectionnée pour créer du module");
      }

      const form = new FormData();
      form.append("name", data.name);
      if (data.thumbnailFile) form.append("thumbnail", data.thumbnailFile);
      // Seuls les champs whitelistés par le backend sont envoyés (name, thumbnail)

      const response = await apiClient.post<ClassSingleResponseDto>(
        `/communities/${selectedCommunityId}/modules`,
        form
      );
      const created = this.mapResponseToEntity(response.data.data);

      console.log("created ssss", created);

      // Enchaîner la création des chapitres et leçons si fournis
      if (Array.isArray(data.chapters) && data.chapters.length > 0) {
        for (const chapter of data.chapters) {
          try {
            const chapterRes = await apiClient.post(
              `/modules/${created.id}/chapters`,
              {
                name: chapter.name,
                active: true,
              }
            );
            const newChapterId =
              chapterRes.data?.data?.id || chapterRes.data?.id;

            if (chapter.lessons && chapter.lessons.length > 0 && newChapterId) {
              for (const lesson of chapter.lessons) {
                const lf = new FormData();
                lf.append("title", lesson.title);
                const normalizedType = String(lesson.type || "").toLowerCase();
                if (normalizedType === "video") {
                  // Envoyer comme texte avec le lien vidéo dans le contenu
                  lf.append("type", normalizedType);
                  // const payload =
                  //   typeof lesson.content === "string"
                  //     ? { videoLink: lesson.content }
                  //     : {
                  //         videoLink: (lesson as any)?.content?.videoLink,
                  //         transcribeVideo: (lesson as any)?.content
                  //           ?.transcribeVideo,
                  //         resources: (lesson as any)?.content?.resources,
                  //       };
                  // lf.append("text", JSON.stringify(lesson.text || {}));
                  lf.append("link", lesson.link || "");
                } else {
                  // Par défaut, texte pur
                  lf.append("type", "text");
                  lf.append("text", lesson.text || "");
                  // lf.append(
                  //   "text",
                  //   typeof lesson.content === "string"
                  //     ? lesson.content
                  //     : JSON.stringify(lesson.content || {})
                  // );
                }

                await apiClient.post(`/chapters/${newChapterId}/lessons`, lf);
              }
            }
          } catch (e) {
            console.error("Erreur lors de la création chapitre/leçons:", e);
          }
        }
      }

      return created;
    } catch (error) {
      console.error("Erreur lors de la création de du module:", error);
      throw new Error("Impossible de créer du module");
    }
  }

  async findAll(communityId: string): Promise<ClassEntity[]> {
    try {
      const response = await apiClient.get<ClassListResponseDto>(
        `/communities/${communityId}/modules`
      );
      return response.data.data.map((classItem) =>
        this.mapResponseToEntity(classItem)
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des classes:", error);
      throw new Error("Impossible de récupérer les classes");
    }
  }

  async findOne(id: string): Promise<ClassEntity> {
    try {
      const response = await apiClient.get<ClassSingleResponseDto>(
        `/modules/${id}`
      );
      return this.mapResponseToEntity(response.data.data);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de du module ${id}:`,
        error
      );
      throw new Error(`Impossible de récupérer du module ${id}`);
    }
  }

  async update(id: string, data: UpdateClassDto): Promise<ClassEntity> {
    try {
      // Mettre à jour les métadonnées de base du module
      const response = await apiClient.patch<ClassSingleResponseDto>(
        `/modules/${id}`,
        {
          name: data.name,
          description: data.description,
          cover: data.cover,
          profil: data.profil,
          color: data.color,
        }
      );
      const updated = this.mapResponseToEntity(response.data.data);

      // Synchroniser les chapitres et leçons si fournis
      if (Array.isArray(data.chapters)) {
        // Recharger pour récupérer les ids actuels
        const current = await this.findOne(id);
        const currentChapters = current.chapters || [];

        // 1) Supprimer les chapitres en surplus côté serveur
        if (currentChapters.length > data.chapters.length) {
          for (let i = data.chapters.length; i < currentChapters.length; i++) {
            const chToRemove = currentChapters[i];
            if (chToRemove?.id) {
              try {
                await apiClient.delete(`/chapters/${chToRemove.id}`);
              } catch (e) {
                console.warn("Suppression chapitre échouée", chToRemove.id, e);
              }
            }
          }
          currentChapters.length = data.chapters.length;
        }

        for (let chIndex = 0; chIndex < data.chapters.length; chIndex++) {
          const ch = data.chapters[chIndex] as any;
          const currentChapter = currentChapters[chIndex];

          // Créer ou mettre à jour le chapitre à l'index
          if (currentChapter?.id) {
            await apiClient.patch(`/chapters/${currentChapter.id}`, {
              name: ch.name,
              active: ch.active,
            });
          } else {
            // Créer un nouveau chapitre si plus de chapitres qu'auparavant
            const chRes = await apiClient.post(`/modules/${id}/chapters`, {
              name: ch.name,
              active: true,
            });
            currentChapters.push({
              id: chRes.data?.data?.id,
              name: ch.name,
              active: true,
              publishedAt: new Date().toISOString(),
              lessons: [],
            } as any);
          }

          // Mettre à jour/Créer les leçons pour ce chapitre
          const chapterId = (currentChapters[chIndex] as any)?.id;
          if (chapterId && Array.isArray(ch.lessons)) {
            const existingLessons = currentChapter?.lessons || [];

            // 1) Supprimer les leçons en surplus
            if (existingLessons.length > ch.lessons.length) {
              for (let j = ch.lessons.length; j < existingLessons.length; j++) {
                const lToRemove = existingLessons[j];
                if (lToRemove?.id) {
                  try {
                    await apiClient.delete(`/lessons/${lToRemove.id}`);
                  } catch (e) {
                    console.warn("Suppression leçon échouée", lToRemove.id, e);
                  }
                }
              }
              existingLessons.length = ch.lessons.length;
            }

            for (let lsIndex = 0; lsIndex < ch.lessons.length; lsIndex++) {
              const ls = ch.lessons[lsIndex] as any;
              const currentLesson = existingLessons[lsIndex];
              const lf = new FormData();
              lf.append("title", ls.title);
              const normalizedType = String(ls.type || "").toLowerCase();
              if (normalizedType === "video") {
                lf.append("type", "video");
                lf.append("link", ls.link || "");
              } else {
                lf.append("type", "text");
                lf.append("text", ls.text || "");
              }

              if (currentLesson?.id) {
                await apiClient.patch(`/lessons/${currentLesson.id}`, lf);
              } else {
                await apiClient.post(`/chapters/${chapterId}/lessons`, lf);
              }
            }
          }
        }
      }

      return updated;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de du module ${id}:`, error);
      throw new Error(`Impossible de mettre à jour du module ${id}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/modules/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de du module ${id}:`, error);
      throw new Error(`Impossible de supprimer du module ${id}`);
    }
  }
}
