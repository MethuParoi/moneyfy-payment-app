/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useChatContext } from "../../../../context/chatContext";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "../../../../store/features/user/userApi";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";

const SingleChatPage = () => {
  const [username, setUsername] = useState("");
  const [messageText, setMessageText] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { id: conversationId } = useParams();
  const { chatReceiver } = useChatContext();

  const { data: conversationData } = useGetMessagesQuery(conversationId);
  const [createMessage] = useCreateMessageMutation();

  useEffect(() => {
    const getUserName = localStorage.getItem("username");
    if (getUserName) {
      setUsername(getUserName);
      console.log(getUserName);
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      scrollContainerRef.current.scrollTop = scrollHeight;
    }
  }, [conversationData]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const messageData = {
      conversationId,
      receiver: chatReceiver?.userId,
      message: messageText,
    };

    const messagePromise = createMessage(messageData).unwrap();

    toast.promise(
      messagePromise,
      {
        pending: "Submitting...",
        success: "Message sent successfully",
        error: "Failed to send message",
      },
      {
        position: "bottom-right",
      }
    );

    try {
      const result = await messagePromise;
      if (result?.success) {
        setMessageText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen py-5 max-w-[1000px] mx-auto flex flex-col items-stretch">
      <div className="flex items-center bg-blue-200 py-3 rounded-full px-2">
        <span className="h-[40px] w-[40px] bg-blue-400 rounded-full flex justify-center items-center mr-4">
          <FaUser className="text-gray-600" />
        </span>
        <h2 className="text-3xl font-semibold text-blue-900">
          {chatReceiver?.name}
        </h2>
      </div>
      <div
        className="flex-1 my-10 flex flex-col items-stretch gap-5 overflow-y-scroll no-scrollbar transition-all duration-300 ease-in-out"
        ref={scrollContainerRef}
      >
        {conversationData?.data?.map((item: any) => {
          const { _id, message, receiver, sender } = item;
          console.log(
            username === receiver?.username || username === sender?.username
          );

          return (
            <div
              key={_id}
              className={`bg-blue-100 w-fit max-w-[70%] p-5 rounded-3xl ${
                username === sender?.username
                  ? "ml-auto rounded-br-none"
                  : "rounded-bl-none"
              }`}
            >
              <p className="text-gray-700 text-2xl">{message}</p>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="mt-auto bg-gray-100 px-3 h-20 rounded-full overflow-hidden flex items-center gap-5 w-[700px] mx-auto"
      >
        <input
          className="flex-1 bg-transparent pl-5 outline-none"
          type="text"
          placeholder="Type here..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button
          type="submit"
          className="h-16 w-16 bg-blue-900 rounded-full text-white flex items-center justify-center hover:bg-gray-900 duration-300 transition-colors ease-in-out"
        >
          <FaArrowRight />
        </button>
      </form>
    </div>
  );
};

export default SingleChatPage;
