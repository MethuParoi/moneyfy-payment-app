import UserList from "@/components/chat/UserList";
import { ChatProvider } from "@/context/chatContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <div className="min-h-screen w-full -ml-[150px] bg-[url('/sky-background.webp')] bg-cover">
        <div className="flex w-full h-full bg-blue-400/70">
          <div className="w-[80%] pl-[200px]">{children}</div>
          <UserList />
        </div>
      </div>
    </ChatProvider>
  );
};

export default layout;
