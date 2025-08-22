import {
  IChatRepo,
  CreateChatGroupDto,
  UpdateChatGroupDto,
  CreateMessageDto,
} from "@/logic/domain/repos/ChatRepo";
import {
  ChatEntity,
  MessageEntity,
  ChatGroupEntity,
  UserEntity,
} from "@/logic/domain/entities";

export class InMemoryChatRepo implements IChatRepo {
  private chatGroups: ChatGroupEntity[] = [];
  private messages: MessageEntity[] = [];
  private chats: ChatEntity[] = [];
  private nextId = 1;

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Créer des groupes de chat par défaut
    const defaultChatGroups: ChatGroupEntity[] = [
      // {
      //   id: 1,
      //   name: "Open Space",
      //   description: "Espace de discussion général",
      //   cover: "",
      //   color: "blue",
      //   communityId: 1,
      //   unreadCount: 2,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      // },
      // {
      //   id: 5,
      //   name: "Pathway",
      //   description: "Chemins et routes",
      //   cover: "",
      //   color: "orange",
      //   communityId: 1,
      //   unreadCount: 1,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      // },
    ];

    this.chatGroups = defaultChatGroups;

    // Créer des messages par défaut
    const defaultMessages: MessageEntity[] = [
      {
        id: 1,
        content: "Contenu du message 1",
        chatGroupId: 1,
        userId: 1,
        replyToId: undefined,
        likes: 83,
        createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // Il y a 3 minutes
        updatedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        sender: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
        },
      },
      {
        sender: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
        },
        id: 2,
        content: "Contenu du message 2",
        chatGroupId: 1,
        userId: 1,
        replyToId: 1,
        likes: 0,
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // Il y a 2 minutes
        updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
    ];

    this.messages = defaultMessages.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    // Créer des chats par défaut
    const defaultChats: ChatEntity[] = [
      {
        id: 1,
        chatGroupId: 1,
        messages: [1, 2, 3],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    this.chats = defaultChats;
  }

  // Chat Groups
  async createChatGroup(data: CreateChatGroupDto): Promise<ChatGroupEntity> {
    const newChatGroup: ChatGroupEntity = {
      id: this.nextId++,
      ...data,
      unreadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.chatGroups.push(newChatGroup);
    return newChatGroup;
  }

  async findAllChatGroups(communityId: number): Promise<ChatGroupEntity[]> {
    return this.chatGroups.filter((group) => group.communityId === communityId);
  }

  async findChatGroupById(id: number): Promise<ChatGroupEntity | null> {
    return this.chatGroups.find((group) => group.id === id) || null;
  }

  async updateChatGroup(
    id: number,
    data: UpdateChatGroupDto
  ): Promise<ChatGroupEntity> {
    const index = this.chatGroups.findIndex((group) => group.id === id);
    if (index === -1) {
      throw new Error("Chat group not found");
    }

    this.chatGroups[index] = {
      ...this.chatGroups[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.chatGroups[index];
  }

  async deleteChatGroup(id: number): Promise<void> {
    const index = this.chatGroups.findIndex((group) => group.id === id);
    if (index !== -1) {
      this.chatGroups.splice(index, 1);
    }
  }

  // Messages
  async createMessage(data: CreateMessageDto): Promise<MessageEntity> {
    const newMessage: MessageEntity = {
      id: this.nextId++,
      ...data,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sender: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    this.messages.push(newMessage);
    return newMessage;
  }

  async findMessagesByChatGroup(chatGroupId: number): Promise<MessageEntity[]> {
    return this.messages
      .filter((message) => message.chatGroupId === chatGroupId)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB;
      });
  }

  async findMessageById(id: number): Promise<MessageEntity | null> {
    return this.messages.find((message) => message.id === id) || null;
  }

  async updateMessage(id: number, content: string): Promise<MessageEntity> {
    const index = this.messages.findIndex((message) => message.id === id);
    if (index === -1) {
      throw new Error("Message not found");
    }

    this.messages[index] = {
      ...this.messages[index],
      content,
      updatedAt: new Date().toISOString(),
    };

    return this.messages[index];
  }

  async deleteMessage(id: number): Promise<void> {
    const index = this.messages.findIndex((message) => message.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }

  // Chat
  async findChatByGroupId(chatGroupId: number): Promise<ChatEntity | null> {
    return this.chats.find((chat) => chat.chatGroupId === chatGroupId) || null;
  }

  async addMessageToChat(chatId: number, messageId: number): Promise<void> {
    const chat = this.chats.find((c) => c.id === chatId);
    if (chat) {
      chat.messages.push(messageId);
      chat.updatedAt = new Date().toISOString();
    }
  }
}
