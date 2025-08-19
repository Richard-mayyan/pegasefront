import { IAuthRepo, LoginResult } from "@/logic/domain/repos/AuthRepo";
import { ProfileEnum, UserEntity } from "@/logic/domain/entities";
import { RegisterDto } from "@/logic/infra/repos/nodeapi/dtos";

export class InMemoryAuthRepo implements IAuthRepo {
  private users: UserEntity[] = [];
  private currentUser: UserEntity | null = null;
  private nextId = 1;

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Créer des utilisateurs par défaut pour les tests
    const defaultUsers: UserEntity[] = [
      {
        id: 1,
        email: "richard.bathiebo.7@gmail.com",
        firstName: "Richard",
        lastName: "Bathiebo",
        password: "Password123@?", // En production, ceci devrait être hashé
        profile: ProfileEnum.Standard,
        communities: [
          {
            id: 1,
            name: "Communauté Test",
            description: "Une communauté de test",
            color: "blue",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: 2,
        email: "jane.smith@example.com",
        firstName: "Jane",
        lastName: "Smith",
        password: "password123",
        profile: ProfileEnum.Coach,
        communities: [
          {
            id: 1,
            name: "Communauté Test",
            description: "Une communauté de test",
            color: "blue",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: 3,
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        password: "admin123",
        profile: ProfileEnum.Coach,
        communities: [
          {
            id: 1,
            name: "Communauté Test",
            description: "Une communauté de test",
            color: "blue",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    ];

    this.users = defaultUsers;
  }

  async login(data: { email: string; password: string }): Promise<LoginResult> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Créer un token d'accès simulé
    const accessToken = `mock_token_${user.id}_${Date.now()}`;

    // Mettre à jour l'utilisateur actuel
    this.currentUser = user;

    localStorage.setItem("loggedInUserId", user.id!.toString());

    return {
      access_token: accessToken,
      user: user,
    };
  }

  async register(data: RegisterDto): Promise<UserEntity> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Vérifier si l'email existe déjà
    const existingUser = this.users.find((u) => u.email === data.email);
    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà");
    }

    // Créer un nouvel utilisateur
    const newUser: UserEntity = {
      id: this.nextId++,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password, // En production, ceci devrait être hashé
      profile: data.profile as any, // Cast vers ProfileEnum
      communities: [],
    };

    this.users.push(newUser);
    this.currentUser = newUser;

    return newUser;
  }

  async confirmAccountWithCode(data: {
    email: string;
    code: string;
  }): Promise<UserEntity> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = this.users.find((u) => u.email === data.email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // En mode simulation, on accepte n'importe quel code
    if (data.code !== "123456") {
      throw new Error("Code de confirmation invalide");
    }

    return user;
  }

  async resendCode(data: { email: string }): Promise<void> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = this.users.find((u) => u.email === data.email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // En mode simulation, on simule juste l'envoi du code
    console.log(`Code de confirmation envoyé à ${data.email}`);
  }

  async forgotPassword(data: { email: string }): Promise<void> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = this.users.find((u) => u.email === data.email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // En mode simulation, on simule juste l'envoi du lien de réinitialisation
    console.log(`Lien de réinitialisation envoyé à ${data.email}`);
  }

  async resetPassword(data: {
    email: string;
    code: string;
    password: string;
  }): Promise<void> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = this.users.find((u) => u.email === data.email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // En mode simulation, on accepte n'importe quel code
    if (data.code !== "123456") {
      throw new Error("Code de réinitialisation invalide");
    }

    // Mettre à jour le mot de passe
    user.password = data.password;
  }

  async getProfile(): Promise<UserEntity> {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) {
      throw new Error("Aucun utilisateur connecté");
    }
    const user = this.users.find((u) => u.id === parseInt(loggedInUserId));
    if (!user) {
      throw new Error("Aucun utilisateur connecté");
    }
    return user;
  }

  async getCurrentUser(): Promise<UserEntity> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!this.currentUser) {
      throw new Error("Aucun utilisateur connecté");
    }

    return this.currentUser;
  }

  // Méthodes utilitaires pour les tests
  setCurrentUser(user: UserEntity | null) {
    this.currentUser = user;
  }

  getAllUsers(): UserEntity[] {
    return [...this.users];
  }

  clearUsers() {
    this.users = [];
    this.currentUser = null;
    this.nextId = 1;
  }
}
