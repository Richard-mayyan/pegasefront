import { apiClient } from "./axios";

export type CreateGroupChatDto = {
  name: string;
  description: string;
  communityId?: string;
};

export type GroupChat = {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Message = {
  id: string;
  content: string;
  parent?: string;
  sender?: any;
  createdAt?: string;
};

export class NodeChatRepo {
  async createGroupChat(dto: CreateGroupChatDto): Promise<GroupChat> {
    const communityId = dto.communityId;

    console.log("communityId", communityId);

    if (!communityId) throw new Error("Aucune communauté sélectionnée");
    const res = await apiClient.post(
      `/communities/${communityId}/group-chats`,
      {
        name: dto.name,
        description: dto.description,
        community: communityId,
      }
    );
    return res.data?.data || res.data;
  }

  async listGroupChats(communityId?: string): Promise<GroupChat[]> {
    const cid = communityId;
    if (!cid) throw new Error("Aucune communauté sélectionnée");
    const res = await apiClient.get(`/communities/${cid}/group-chats`);

    const list = res.data?.data || res.data || [];
    // console.log("list", list);

    return list;
  }

  async listMessages(groupChatId: string): Promise<Message[]> {
    const res = await apiClient.get(`/group-chats/${groupChatId}/messages`);

    const list = res.data?.data || res.data || [];
    console.log("list", list);
    return list;
  }

  async sendMessage({
    groupChatId,
    content,
    parentId,
    senderId,
  }: {
    groupChatId: string;
    content: string;
    parentId?: string;
    senderId: string;
  }): Promise<Message> {
    const payload: any = { content, sender: senderId, groupChat: groupChatId };
    if (parentId) payload.responseToMessage = parentId;

    console.log("payload", payload);
    const res = await apiClient.post(
      `/group-chats/${groupChatId}/messages`,
      payload
    );
    return res.data?.data || res.data;
  }
}
