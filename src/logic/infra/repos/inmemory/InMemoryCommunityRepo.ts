import {
  ICommunityRepo,
  CreateCommunityDto,
  UpdateCommunityDto,
} from "@/logic/domain/repos/CommunityRepo";
import { CommunityEntity } from "@/logic/domain/entities";

export class InMemoryCommunityRepo implements ICommunityRepo {
  private communities: CommunityEntity[] = [];
  private readonly storageKey = "pegas_communities";

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === "undefined") return; // Côté serveur

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.communities = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des communautés:", error);
      this.communities = [];
    }
  }

  private saveToStorage() {
    if (typeof window === "undefined") return; // Côté serveur

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.communities));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des communautés:", error);
    }
  }

  async create(data: CreateCommunityDto): Promise<CommunityEntity> {
    const newCommunity: CommunityEntity = {
      id: this.communities.length + 1,
      name: data.name,
      description: data.description,
      profil: data.profil,
      color: data.color,
      typography: data.typography,
      classes: [],
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.communities.push(newCommunity);
    this.saveToStorage();
    return newCommunity;
  }

  async findAll(): Promise<CommunityEntity[]> {
    return [...this.communities];
  }

  async findOne(id: string): Promise<CommunityEntity> {
    const foundCommunity = this.communities.find(
      (c) => c.id?.toString() === id
    );
    if (!foundCommunity) {
      throw new Error(`Community with id ${id} not found`);
    }
    return foundCommunity;
  }

  async update(id: string, data: UpdateCommunityDto): Promise<CommunityEntity> {
    const index = this.communities.findIndex((c) => c.id?.toString() === id);
    if (index === -1) {
      throw new Error(`Community with id ${id} not found`);
    }

    this.communities[index] = {
      ...this.communities[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.saveToStorage();
    return this.communities[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.communities.findIndex((c) => c.id?.toString() === id);
    if (index === -1) {
      throw new Error(`Community with id ${id} not found`);
    }

    this.communities.splice(index, 1);
    this.saveToStorage();
  }
}
