import ChatEmptyState from "./_components/chat-empty-state";
import ChatInputArea from "./_components/chat-input-area";
import ChatNavbar from "./_components/chat-navbar";
import ChatSidebar from "./_components/chat-reset";

export default function ChatLayout({ children }: any) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar />
      <div className="flex flex-col flex-1 bg-white">
        <ChatNavbar />
        {children}
        <ChatInputArea />
      </div>
    </div>
  );
}
