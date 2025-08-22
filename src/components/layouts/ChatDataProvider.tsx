"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ChatGroupEntity,
  MessageEntity,
  ChatEntity,
} from "@/logic/domain/entities";
import { chatRepo } from "@/logic/infra/di/container";
import { useAppData } from "./AppDataProvider";
import { useAuth } from "./AuthProvider";

interface ChatDataContextType {
  replyTo: number | null;
  setReplyTo: (replyTo: number | null) => void;

  // État actuel
  currentChatGroup: ChatGroupEntity | null;
  currentChat: ChatEntity | null;
  messages: MessageEntity[];

  // Groupes de chat
  chatGroups: ChatGroupEntity[];

  // Actions
  setCurrentChatGroup: (chatGroup: ChatGroupEntity | null) => void;
  createChatGroup: (data: {
    name: string;
    description?: string;
    color?: string;
  }) => Promise<ChatGroupEntity>;
  sendMessage: (content: string, replyToId?: number) => Promise<MessageEntity>;
  likeMessage: (messageId: number) => Promise<void>;

  // État de chargement
  isLoading: boolean;
}

const ChatDataContext = createContext<ChatDataContextType | undefined>(
  undefined
);

export function ChatDataProvider({ children }: { children: React.ReactNode }) {
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const { currentCommunity: community } = useAppData();
  const [currentChatGroup, setCurrentChatGroup] =
    useState<ChatGroupEntity | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatEntity | null>(null);
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [chatGroups, setChatGroups] = useState<ChatGroupEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fonction pour organiser les messages avec réponses

  // Charger les groupes de chat de la communauté
  useEffect(() => {
    const loadChatGroups = async () => {
      if (community?.id) {
        try {
          setIsLoading(true);
          const groups = await (chatRepo as any).listGroupChats?.(
            community.id?.toString()
          );
          const mapped = (groups || []).map((g: any) => ({
            id: Number(g.id) || g.id,
            name: g.name,
            description: g.description,
            cover: undefined,
            color: undefined,
            communityId: Number(community.id),
            unreadCount: 0,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          })) as ChatGroupEntity[];
          setChatGroups(mapped);

          if (mapped.length > 0 && !currentChatGroup) {
            setCurrentChatGroup(mapped[0]);
          }
        } catch (error) {
          console.error(
            "Erreur lors du chargement des groupes de chat:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        // Aucune communauté sélectionnée → pas de chargement bloquant
        setChatGroups([]);
        setCurrentChatGroup(null);
        setIsLoading(false);
      }
    };

    loadChatGroups();
  }, [community?.id]);

  // Charger les messages du groupe de chat actuel
  useEffect(() => {
    const loadMessages = async () => {
      if (currentChatGroup?.id) {
        try {
          setIsLoading(true);
          const msgs = await chatRepo.listMessages(String(currentChatGroup.id));
          const mappedMsgs = (msgs || []).map((m: any) => ({
            sender: m.sender,
            id: Number(m.id) || m.id,
            content: m.content,
            chatGroupId: Number(currentChatGroup.id),
            userId: m.sender?.id ? Number(m.sender.id) : 0,
            username:
              `${m.sender?.firstName || ""} ${
                m.sender?.lastName || ""
              }`.trim() || "Utilisateur",
            replyToId: m.responseToMessage?.id
              ? Number(m.responseToMessage.id)
              : undefined,
            likes: 0,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
            replies: m.replies, // Initialiser les réponses
          })) as MessageEntity[];

          // Organiser les messages avec réponses
          setMessages(mappedMsgs);

          // Pas d'entité Chat backend distincte; on peut conserver null
          setCurrentChat({
            id: Number(currentChatGroup.id),
            chatGroupId: Number(currentChatGroup.id),
            messages: mappedMsgs.map((mm) => mm.id!) as number[],
            createdAt: undefined,
            updatedAt: undefined,
          });
        } catch (error) {
          console.error("Erreur lors du chargement des messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMessages();
  }, [currentChatGroup?.id]);

  // Créer un nouveau groupe de chat
  const createChatGroup = async (data: {
    name: string;
    description?: string;
    color?: string;
  }): Promise<ChatGroupEntity> => {
    if (!community?.id) {
      throw new Error("Aucune communauté sélectionnée");
    }

    const created = await (chatRepo as any).createGroupChat?.({
      name: data.name,
      description: data.description || "",
      communityId: String(community.id),
    });

    const newChatGroup: ChatGroupEntity = {
      id: Number(created?.id) || created?.id,
      name: created?.name || data.name,
      description: created?.description || data.description,
      cover: undefined,
      color: data.color,
      communityId: Number(community.id),
      unreadCount: 0,
      createdAt: created?.createdAt,
      updatedAt: created?.updatedAt,
    };

    setChatGroups((prev) => [newChatGroup, ...prev]);
    setCurrentChatGroup(newChatGroup);

    return newChatGroup;
  };

  // Envoyer un message
  const sendMessage = async (content: string): Promise<MessageEntity> => {
    console.log("replyToId", replyTo);
    // if (!replyTo) {
    //   return;
    // }
    if (!currentChatGroup?.id) {
      throw new Error("Aucun groupe de chat sélectionné");
    }

    const created = await chatRepo.sendMessage({
      senderId: user?.id as any,
      groupChatId: String(currentChatGroup.id),
      content,
      parentId: replyTo ? String(replyTo) : undefined,
    });

    const newMessage: MessageEntity = {
      sender: created?.sender,
      id: created.id as any,
      content: created?.content || content,
      chatGroupId: Number(currentChatGroup.id),
      userId: created?.sender?.id ? Number(created.sender.id) : 0,
      // username:
      //   `${created?.sender?.firstName || ""} ${
      //     created?.sender?.lastName || ""
      //   }`.trim() || "Utilisateur",
      // replyToId: created?.responseToMessage?.id
      //   ? Number(created.responseToMessage.id)
      //   : undefined,
      likes: 0,
      createdAt: created?.createdAt,
      // updatedAt: created?.updatedAt,
    };

    if (replyTo) {
      const replyToMessage = messages.find((m) => m.id === replyTo);
      if (replyToMessage) {
        replyToMessage.replies = [
          ...(replyToMessage.replies || []),
          newMessage,
        ];
      }
    } else {
      setMessages((prev) => [...prev, newMessage]);
    }

    if (currentChat?.id) {
      setCurrentChat({
        ...currentChat,
        messages: [...(currentChat.messages || []), newMessage.id!],
      });
    }

    return newMessage;
  };

  // Liker un message (optimistic local update)
  const likeMessage = async (messageId: number): Promise<void> => {
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex !== -1) {
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        likes: (updatedMessages[messageIndex].likes || 0) + 1,
      };
      setMessages(updatedMessages);
    }
  };

  const value: ChatDataContextType = {
    replyTo,
    setReplyTo,
    currentChatGroup,
    currentChat,
    messages,
    chatGroups,
    setCurrentChatGroup,
    createChatGroup,
    sendMessage,
    likeMessage,
    isLoading,
  };

  return (
    <ChatDataContext.Provider value={value}>
      {children}
    </ChatDataContext.Provider>
  );
}

export function useChatData() {
  const context = useContext(ChatDataContext);
  if (context === undefined) {
    throw new Error("useChatData must be used within a ChatDataProvider");
  }
  return context;
}
