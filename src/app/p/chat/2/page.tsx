import ChatMessage from "./_components/chat-message";
import NewDiscussionGroupForm from "./_components/new-discussion-group-form";

export default function Home() {
  return (
    <div>
      {/* <NewDiscussionGroupForm /> */}

      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-center justify-center gap-8 p-4">
        <div className="flex flex-col gap-4">
          <ChatMessage
            avatarSrc="/placeholder.svg?height=32&width=32"
            userName="Jordan Heno"
            timestamp="Il y a 3 minutes"
            message="C'est dans 30 minutes\nQuand il dit 20h30 c'est l'heure de côte d'Ivoire donc ici (Afrique Centrale en majorité) c'est 21h30"
            likes={83}
            comments={83}
          />
          <ChatMessage
            avatarSrc="/placeholder.svg?height=32&width=32"
            userName="Jordan Heno"
            timestamp="Il y a 3 minutes"
            message="C'est dans 30 minutes\nQuand il dit 20h30 c'est l'heure de côte d'Ivoire donc ici (Afrique Centrale en majorité) c'est 21h30"
            likes={83}
            comments={83}
          />
        </div>
      </div>
    </div>
  );
}
