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
      id: response.id,
      name: response.name,
      description: response.description,
      cover: response.thumbnail,
      profil: response.profil,
      color: response.color,
      content: response.content,
      chapters:
        response.chapters?.map((chapter) => ({
          id: chapter.id,
          name: chapter.name,
          active: chapter.active,
          publishedAt: chapter.publishedAt,
          lessons:
            chapter.lessons?.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              type: lesson.type,
              publishedAt: lesson.publishedAt,
              content: lesson.content,
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
        throw new Error("Aucune communauté sélectionnée pour créer la classe");
      }

      const form = new FormData();
      form.append("name", data.name);
      if (data.thumbnailFile) form.append("thumbnail", data.thumbnailFile);
      // Seuls les champs whitelistés par le backend sont envoyés (name, thumbnail)

      const response = await apiClient.post<ClassSingleResponseDto>(
        `/communities/${selectedCommunityId}/classes`,
        form
      );
      const created = this.mapResponseToEntity(response.data.data);

      console.log("created ssss", created);

      // Enchaîner la création des chapitres et leçons si fournis
      if (Array.isArray(data.chapters) && data.chapters.length > 0) {
        for (const chapter of data.chapters) {
          try {
            const chapterRes = await apiClient.post(
              `/classes/${created.id}/chapters`,
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
                  lf.append("type", "Text");
                  const payload =
                    typeof lesson.content === "string"
                      ? { videoLink: lesson.content }
                      : {
                          videoLink: (lesson as any)?.content?.videoLink,
                          transcribeVideo: (lesson as any)?.content
                            ?.transcribeVideo,
                          resources: (lesson as any)?.content?.resources,
                        };
                  lf.append("text", JSON.stringify(payload || {}));
                } else {
                  // Par défaut, texte pur
                  lf.append("type", "text");
                  lf.append(
                    "text",
                    typeof lesson.content === "string"
                      ? lesson.content
                      : JSON.stringify(lesson.content || {})
                  );
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
      console.error("Erreur lors de la création de la classe:", error);
      throw new Error("Impossible de créer la classe");
    }
  }

  async findAll(communityId: string): Promise<ClassEntity[]> {
    try {
      const response = await apiClient.get<ClassListResponseDto>(
        `/communities/${communityId}/classes`
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
        `/classes/${id}`
      );
      return this.mapResponseToEntity(response.data.data);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la classe ${id}:`,
        error
      );
      throw new Error(`Impossible de récupérer la classe ${id}`);
    }
  }

  async update(id: string, data: UpdateClassDto): Promise<ClassEntity> {
    try {
      const response = await apiClient.patch<ClassSingleResponseDto>(
        `/classes/${id}`,
        data
      );
      return this.mapResponseToEntity(response.data.data);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la classe ${id}:`, error);
      throw new Error(`Impossible de mettre à jour la classe ${id}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/classes/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la classe ${id}:`, error);
      throw new Error(`Impossible de supprimer la classe ${id}`);
    }
  }
}
