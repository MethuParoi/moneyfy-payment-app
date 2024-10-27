"use client";

import React from "react";
import { BiCreditCard, BiSolidFoodMenu } from "react-icons/bi";
import NavButtons from "./NavButtons";
import { MdAccountCircle } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { FaShop, FaUsers } from "react-icons/fa6";
import { AiTwotoneSetting } from "react-icons/ai";

const PropsArray = [
  { icon: MdAccountCircle, onClick: () => alert("Withdraw clicked") },
  { icon: IoWalletSharp, onClick: () => alert("Transfer clicked") },
  { icon: BiCreditCard, onClick: () => alert("Credit Card clicked") },
  { icon: FaShop, onClick: () => alert("Withdraw clicked again") },
  { icon: FaUsers, onClick: () => alert("Transfer clicked again") },
  { icon: BiSolidFoodMenu, onClick: () => alert("Credit Card clicked again") },
  { icon: AiTwotoneSetting, onClick: () => alert("Credit Card clicked again") },
];

function Navbar() {
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
