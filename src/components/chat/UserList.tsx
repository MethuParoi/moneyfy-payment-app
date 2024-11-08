import {
  useCheckConversationMutation,
  useCreateConversationMutation,
  useGetMessagesMutation,
} from "@/store/features/user/userApi";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

function UserList({
  user,
  setConversation,
  setReceiver,
}: {
  user: User;
  setConversation: any;
  setReceiver: any;
}) {
  const [createConversation] = useCreateConversationMutation();
  const [checkConversation] = useCheckConversationMutation();
  const [getMessages] = useGetMessagesMutation();

  const handleConversation = async (conversationId: string) => {
    // const token = localStorage.getItem("token");
    const receiver = user._id;
    const checkUserConversation = await checkConversation({
      conversationId,
    }).unwrap();
    if (checkUserConversation.result === false) {
      setConversation([]);
      const createUserConversation = await createConversation({
        receiver,
      }).unwrap();
      if (createUserConversation?.succeass) {
        //  setConversation(checkUserConversation.result);
      }
    } else if (checkUserConversation?.success) {
      let conversationId = checkUserConversation.result._id;
      const getUserConversation = await getMessages({
        conversationId,
      }).unwrap();
      setConversation([]);
      if (getUserConversation?.success) {
        setConversation(getUserConversation.data);
        // console.log("Conversation:", conversation);
      }
      //store user data in local storage
      //   localStorage.setItem("conversationId", checkUserConversation.result._id);
    }
  };
  return (
    <div
      onClick={() => {
        handleConversation(user._id);
      }}
      className="pl-[8rem] my-1 py-4 flex items-center gap-x-6  backdrop-blur-[30px] cursor-pointer hover:bg-[#dfeceb91]"
    >
      <div>
        <FaUserCircle className="text-[4rem]" />
      </div>
      <h2 className="text-3xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
    </div>
  );
}

export default UserList;
