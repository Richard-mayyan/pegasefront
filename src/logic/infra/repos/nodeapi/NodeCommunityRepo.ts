import {
  ICommunityRepo,
  CreateCommunityDto,
  UpdateCommunityDto,
} from "@/logic/domain/repos/CommunityRepo";
import { CommunityEntity } from "@/logic/domain/entities";
import { apiClient } from "./axios";
import {
  CommunityResponseDto,
  CommunityListResponseDto,
  CommunitySingleResponseDto,
} from "./dtos";

export class NodeCommunityRepo implements ICommunityRepo {
  private mapResponseToEntity(response: CommunityResponseDto): CommunityEntity {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      profil: response.profil,
      logo: response.logo,
      images: response.images,
      studentCount: response.studentCount,
      color: response.color,
      typography: response.typography,
      settings: response.settings,
      classes: response.classes,
      members: response.members,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  async create(data: CreateCommunityDto): Promise<CommunityEntity> {
    try {
      // Créer un FormData pour l'upload de fichiers
      const formData = new FormData();

      // Ajouter les données textuelles
      formData.append("name", data.name);
      formData.append("font", data.typography);
      if (data.description) formData.append("description", data.description);
      //   if (data.profil) formData.append("profil", data.profil);
      if (data.color) formData.append("color", data.color);
      if (data.typography) formData.append("typography", data.typography);

      formData.append("trial_days", "2");
      formData.append("price", "299");

      // Ajouter les paramètres de configuration
      //   if (data.settings) {
      //     formData.append(
      //       "communityDiscussion",
      //       data.settings.communityDiscussion.toString()
      //     );
      //     formData.append(
      //       "studentListVisibility",
      //       data.settings.studentListVisibility.toString()
      //     );
      //     formData.append("groupMeeting", data.settings.groupMeeting.toString());
      //   }

      // Gérer le logo (convertir base64 en File si nécessaire)
      if (data.logo) {
        if (data.logo.startsWith("data:")) {
          // Convertir base64 en File
          const logoFile = this.base64ToFile(data.logo, "logo.png");
          formData.append("logo", logoFile);
        } else {
          // C'est déjà un fichier
          formData.append("logo", data.logo);
        }
      }

      // Gérer les images de couverture (convertir base64 en Files si nécessaire)
      if (data.images && data.images.length > 0) {
        data.images.forEach((photo, index) => {
          if (photo.startsWith("data:")) {
            // Convertir base64 en File
            const imageFile = this.base64ToFile(photo, `cover-${index}.png`);
            formData.append("images", imageFile);
          } else {
            // C'est déjà un fichier
            formData.append("images", photo);
          }
        });
      }

      // Gérer la couverture principale (première image si pas de cover spécifique)
      //   if (data.cover) {
      //     if (data.cover.startsWith("data:")) {
      //       const coverFile = this.base64ToFile(data.cover, "cover.png");
      //       formData.append("images", coverFile);
      //     } else {
      //       formData.append("images", data.cover);
      //     }
      //   }

      console.log("Envoi de la requête avec FormData:", {
        name: data.name,
        hasLogo: !!data.logo,
        coverPhotosCount: data.images?.length || 0,
        hasCover: !!data.cover,
      });

      console.log("FormData:", formData);

      const response = await apiClient.post<CommunitySingleResponseDto>(
        "/communities",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return this.mapResponseToEntity(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la création de la communauté:", error);
      throw new Error("Impossible de créer la communauté");
    }
  }

  /**
   * Convertit une chaîne base64 en objet File
   */
  private base64ToFile(base64String: string, filename: string): File {
    // Extraire le type MIME et les données base64
    const matches = base64String.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Format base64 invalide");
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Convertir base64 en ArrayBuffer
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Créer le File
    return new File([byteArray], filename, { type: mimeType });
  }

  async findAll(): Promise<CommunityEntity[]> {
    try {
      const response = await apiClient.get<CommunityListResponseDto>(
        "/communities"
      );
      return response.data.data.map((community) =>
        this.mapResponseToEntity(community)
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des communautés:", error);
      throw new Error("Impossible de récupérer les communautés");
    }
  }

  async findOne(id: string): Promise<CommunityEntity> {
    try {
      const response = await apiClient.get<CommunitySingleResponseDto>(
        `/communities/${id}`
      );
      return this.mapResponseToEntity(response.data.data);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la communauté ${id}:`,
        error
      );
      throw new Error(`Impossible de récupérer la communauté ${id}`);
    }
  }

  async update(id: string, data: UpdateCommunityDto): Promise<CommunityEntity> {
    try {
      const formData = new FormData();

      // // Ajouter les champs texte
      // Object.keys(data).forEach((key) => {
      //   if (
      //     key !== "images" &&
      //     data[key as keyof UpdateCommunityDto] !== undefined &&
      //     data[key as keyof UpdateCommunityDto] !== null
      //   ) {
      //     formData.append(key, String(data[key as keyof UpdateCommunityDto]));
      //   }
      // });

      // Ajouter les images de couverture
      if (data.images && data.images.length > 0) {
        data.images.forEach((photo: string, index: number) => {
          if (photo.startsWith("data:image/")) {
            const imageFile = this.base64ToFile(photo, `cover-${index}.png`);
            formData.append("images", imageFile);
          }
        });
      }

      const response = await apiClient.patch<CommunitySingleResponseDto>(
        `/communities/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return this.mapResponseToEntity(response.data.data);
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de la communauté ${id}:`,
        error
      );
      throw new Error(`Impossible de mettre à jour la communauté ${id}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/communities/${id}`);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de la communauté ${id}:`,
        error
      );
      throw new Error(`Impossible de supprimer la communauté ${id}`);
    }
  }
}
