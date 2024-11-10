"use client";

import React from "react";
import {
  BiCreditCard,
  BiLogOut,
  BiSolidFoodMenu,
  BiSolidHomeCircle,
} from "react-icons/bi";
import NavButtons from "./NavButtons";
import { MdAccountCircle } from "react-icons/md";
import { FaShop, FaUsers } from "react-icons/fa6";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  const PropsArray = [
    {
      icon: BiSolidHomeCircle,
      onClick: () => router.push("/dashboard"),
    },
    { icon: IoIosChatbubbles, onClick: () => router.push("/chat") },
    { icon: MdAccountCircle, onClick: () => router.push("/profile") },

    {
      icon: AiTwotoneSetting,
      onClick: () => console.log("Credit Card clicked again"),
    },
    {
      icon: BiLogOut,
      onClick: () => {
        localStorage.clear();
        router.push("/signin");
      },
    },
  ];

  return (
    <div className="w-screen h-[4rem] md:w-[15rem] md:h-screen bg-[#2b444e] rounded-r-[5rem] z-20 border-r-2 border-white/40 flex flex-col justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-[1.8rem] font-semibold">MoneyFy</h1>
      </div>

      {/* icons */}
      <div>
        {PropsArray.map((props, index) => (
          <NavButtons key={index} icon={props.icon} onClick={props.onClick} />
        ))}
      </div>

      <div className="ml-4">
        <p className="text-white">connects all your cards</p>
      </div>
    </div>
  );
}

export default Navbar;
