import { ChatDataProvider } from "@/components/layouts/ChatDataProvider";
import ChatEmptyState from "./_components/chat-empty-state";
import ChatInputArea from "./_components/chat-input-area";
import ChatNavbar from "./_components/chat-navbar";
import ChatSidebar from "./_components/chat-reset";

export default function ChatLayout({ children }: any) {
  return (
    <ChatDataProvider>
      <div className="flex h-screen overflow-hidden ">
        <ChatSidebar />
        <div className="flex flex-col flex-1 bg-white relative pt-[70px]">
          {children}
          <ChatInputArea />
        </div>
      </div>
    </ChatDataProvider>
  );
}
