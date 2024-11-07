"use client";

import ChatBubble from "@/components/chat/ChatBubble";
import UserList from "@/components/chat/UserList";
import { useGetAllUserMutation } from "@/store/features/user/userApi";
import { use, useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState([]);
  const [getAllUser] = useGetAllUserMutation();

  const handleUser = async () => {
    const token = localStorage.getItem("token");
    const checkUser = await getAllUser({ token }).unwrap();
    if (checkUser?.success) {
      setUser(checkUser.result);
    } else {
      toast.error("user data fetching failed");
    }
  };

  useEffect(() => {
    handleUser();
  }, []);
  return (
    <div className=" h-screen min-w-screen flex bg-[#3d7bee] ml-[-5rem]">
      <div className="h-full xl:w-[50rem] bg-[#dfeceb]/50 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
        <div>
          <div className="ml-[7rem]">
            <h1 className="text-[3rem] font-semibold text-gray-700">Users</h1>
            <p className="text-gray-600">Connect all your users</p>
          </div>
          {user.map((user, index) => (
            <UserList key={index} user={user} />
          ))}
        </div>
      </div>
      <div className="h-full xl:w-[150rem] bg-[#333636]/30 backdrop-blur-[30px] ml-[-7rem] pl-[10rem] flex p-6">
        <div className="ml-auto">
          <ChatBubble />
        </div>
      </div>
    </div>
  );
}

export default Page;
