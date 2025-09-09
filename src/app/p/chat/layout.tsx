"use client";
import { ChatDataProvider } from "@/components/layouts/ChatDataProvider";
import ChatEmptyState from "./_components/chat-empty-state";
import ChatInputArea from "./_components/chat-input-area";
import ChatNavbar from "./_components/chat-navbar";
import ChatSidebar from "./_components/chat-reset";
import { useState } from "react";

export default function ChatLayout({ children }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ChatDataProvider>
      <div className="flex h-full overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:relative
          top-0 left-0 z-50 lg:z-auto
          w-80 h-full
          transition-transform duration-300 ease-in-out
        `}
        >
          <ChatSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-between flex-1 bg-white relative">
          <ChatNavbar onMenuClick={() => setIsSidebarOpen(true)} />
          {children}
          <ChatInputArea />
        </div>
      </div>
    </ChatDataProvider>
  );
}
