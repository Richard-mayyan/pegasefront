import { ChatEntity, MessageEntity, ChatGroupEntity } from "../entities";

export interface CreateChatGroupDto {
  name: string;
  description?: string;
  cover?: string;
  color?: string;
  communityId: number;
}

export interface UpdateChatGroupDto {
  name?: string;
  description?: string;
  cover?: string;
  color?: string;
}

export interface CreateMessageDto {
  content: string;
  chatGroupId: number;
  userId: number;
  replyToId?: number;
}

export interface IChatRepo {
  // Chat Groups
  createChatGroup(data: CreateChatGroupDto): Promise<ChatGroupEntity>;
  findAllChatGroups(communityId: number): Promise<ChatGroupEntity[]>;
  findChatGroupById(id: number): Promise<ChatGroupEntity | null>;
  updateChatGroup(
    id: number,
    data: UpdateChatGroupDto
  ): Promise<ChatGroupEntity>;
  deleteChatGroup(id: number): Promise<void>;

  // Messages
  createMessage(data: CreateMessageDto): Promise<MessageEntity>;
  findMessagesByChatGroup(chatGroupId: number): Promise<MessageEntity[]>;
  findMessageById(id: number): Promise<MessageEntity | null>;
  updateMessage(id: number, content: string): Promise<MessageEntity>;
  deleteMessage(id: number): Promise<void>;

  // Chat
  findChatByGroupId(chatGroupId: number): Promise<ChatEntity | null>;
  addMessageToChat(chatId: number, messageId: number): Promise<void>;
}
