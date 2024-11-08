"use client";

import ChatBubble from "@/components/chat/ChatBubble";
import UserList from "@/components/chat/UserList";
import {
  useGetAllUserQuery,
  useGetMessagesMutation,
  useSendMessagesMutation,
} from "@/store/features/user/userApi";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

function Page() {
  const [user, setUser] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [sendMessages] = useSendMessagesMutation();
  const [getMessages] = useGetMessagesMutation();
  const userName = localStorage.getItem("username");
  const { data: userData } = useGetAllUserQuery(undefined);

  console.log("user", userData);
  const handleUser = async () => {
    const token = localStorage.getItem("token");
    if (checkUser?.success) {
      setUser(checkUser.result);
    } else {
      toast.error("user data fetching failed");
    }
  };

  //   const handleAllMessages = async (conversationId) => {
  //     const checkAllMessages = await getAllUser({ conversationId }).unwrap();
  //     if (checkAllMessages?.success) {
  //       setConversation(checkAllMessages.data.message);
  //     } else {
  //       toast.error("user message fetching failed");
  //     }
  //   };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Send the message with receiver and conversationId (if available)
    const sendMessage = await sendMessages({
      message: userMessage,
      receiver,
      conversationId,
    }).unwrap();

    if (sendMessage?.success) {
      // Update the conversationId with the ID returned from the API if it was created
      if (sendMessage.conversationId) {
        setConversationId(sendMessage.conversationId);
      }

      // Add the new message to the conversation state for real-time update
      setConversation((prevConversation) => [
        ...prevConversation,
        { message: userMessage, sender: { username: userName } },
      ]);
      setUserMessage(""); // Clear input field
    } else {
      toast.error("Message sending failed");
    }
  };

  useEffect(() => {
    handleUser();
    // handleAllMessages(conversationId);
    // console.log("conversation:", conversation);
  }, []);

  useEffect(() => {
    // handleAllMessages(conversationId);
    if (conversation.length > 0) {
      const lastMessage = conversation[conversation.length - 1];
      if (!conversationId && lastMessage._id) {
        setConversationId(lastMessage._id); // Set only if not already set
      }
      if (lastMessage.sender.username !== userName) {
        setReceiver(lastMessage.sender._id);
      }
    }
  }, [conversation, userName, conversationId]);

  return (
    <div className="h-screen min-w-screen flex bg-[#3d7bee] ml-[-5rem]">
      <div className="h-full xl:w-[50rem] bg-[#dfeceb]/50 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
        <div>
          <div className="ml-[7rem]">
            <h1 className="text-[3rem] font-semibold text-gray-700">Users</h1>
            <p className="text-gray-600">Connect all your users</p>
          </div>
          {userData?.result?.map((user, index) => (
            <UserList
              key={index}
              user={user}
              conversation={conversation}
              setConversation={setConversation}
              setReceiver={() => setReceiver(user._id)} // Set receiver when selecting a user
            />
          ))}
        </div>
      </div>
      <div className="h-full xl:w-[150rem] bg-[#333636]/30 backdrop-blur-[30px] ml-[-7rem] pl-[10rem] flex flex-col p-6">
        <div className="flex flex-col gap-4 w-full">
          {conversation.map((message, index) => {
            const isCurrentUser = message.sender.username === userName;
            return (
              <div
                key={index}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <ChatBubble message={message.message} />
              </div>
            );
          })}
        </div>
        {/* Message input */}
        <div className="fixed bottom-16 right-[30rem] flex items-center gap-x-6">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-[90rem] h-[5rem] bg-gray-200 rounded-xl px-4 text-3xl"
          />
          <button onClick={handleSendMessage}>
            <IoSend className="text-[4rem] text-gray-100 hover:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;

// "use client";

// import ChatBubble from "@/components/chat/ChatBubble";
// import UserList from "@/components/chat/UserList";
// import {
//   useGetAllUserMutation,
//   useSendMessagesMutation,
// } from "@/store/features/user/userApi";
// import { useEffect, useState } from "react";
// import { IoSend } from "react-icons/io5";
// import { toast } from "react-toastify";

// function Page() {
//   const [user, setUser] = useState([]);
//   const [conversation, setConversation] = useState([]);
//   const [conversationId, setConversationId] = useState(null);
//   const [receiver, setReceiver] = useState(null);
//   const [userMessage, setUserMessage] = useState("");
//   const [getAllUser] = useGetAllUserMutation();
//   const [sendMessages] = useSendMessagesMutation();
//   const userName = localStorage.getItem("username");

//   const handleUser = async () => {
//     const token = localStorage.getItem("token");
//     const checkUser = await getAllUser({ token }).unwrap();
//     if (checkUser?.success) {
//       setUser(checkUser.result);
//     } else {
//       toast.error("user data fetching failed");
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!userMessage.trim()) return;

//     const sendMessage = await sendMessages({
//       conversationId,
//       message: userMessage,
//       receiver,
//     }).unwrap();

//     if (sendMessage?.success) {
//       if (sendMessage.data.conversationId) {
//         setConversationId(sendMessage.data.conversationId);
//       }
//       // Add the message to the conversation state
//       setConversation((prevConversation) => [
//         ...prevConversation,
//         { message: userMessage, sender: { username: userName } },
//       ]);
//       setUserMessage(""); // Clear input field
//     } else {
//       toast.error("Message sending failed");
//     }
//   };

//   useEffect(() => {
//     handleUser();
//   }, []);

//   useEffect(() => {
//     if (conversation.length > 0) {
//       const lastMessage = conversation[conversation.length - 1];
//       setConversationId(lastMessage._id);
//       if (lastMessage.sender.username !== userName) {
//         setReceiver(lastMessage.sender._id);
//       }
//     }
//   }, [conversation, userName]);

//   return (
//     <div className="h-screen min-w-screen flex bg-[#3d7bee] ml-[-5rem]">
//       <div className="h-full xl:w-[50rem] bg-[#dfeceb]/50 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
//         <div>
//           <div className="ml-[7rem]">
//             <h1 className="text-[3rem] font-semibold text-gray-700">Users</h1>
//             <p className="text-gray-600">Connect all your users</p>
//           </div>
//           {user.map((user, index) => (
//             <UserList
//               key={index}
//               user={user}
//               setConversation={setConversation}
//               setReceiver={() => setReceiver(user._id)} // Set receiver when selecting a user
//             />
//           ))}
//         </div>
//       </div>
//       <div className="h-full xl:w-[150rem] bg-[#333636]/30 backdrop-blur-[30px] ml-[-7rem] pl-[10rem] flex flex-col p-6">
//         <div className="flex flex-col gap-4 w-full">
//           {conversation.map((message, index) => {
//             const isCurrentUser = message.sender.username === userName;
//             return (
//               <div
//                 key={index}
//                 className={`flex ${
//                   isCurrentUser ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <ChatBubble message={message.message} />
//               </div>
//             );
//           })}
//         </div>
//         {/* Message input */}
//         <div className="fixed bottom-16 right-[30rem] flex items-center gap-x-6">
//           <input
//             type="text"
//             value={userMessage}
//             onChange={(e) => setUserMessage(e.target.value)}
//             className="w-[90rem] h-[5rem] bg-gray-200 rounded-xl px-4 text-3xl"
//           />
//           <button onClick={handleSendMessage}>
//             <IoSend className="text-[4rem] text-gray-100 hover:text-gray-300" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

