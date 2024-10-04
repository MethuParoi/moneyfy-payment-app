import React from "react";
import Image from "next/image";
import Card from "../../images/dashboard/Card.png";
import User from "../../images/dashboard/user.png";
import SmallCard from "./SmallCard";
import Users from "./Users";
import { IoCopyOutline } from "react-icons/io5";

const smallCardPropsArray = [
  { label: "Withdraw", icon: "BiMoneyWithdraw", color: "#f67a3b" },
  { label: "Deposit", icon: "GiReceiveMoney", color: "#17a19e" },
  { label: "Transfer", icon: "BiTransfer", color: "#b97fe3" },
];

function CardSection() {
  return (
    <div className="flex flex-col items-center mt-[5rem]">
      <div className="self-start">
        <h1 className="text-[3rem] font-semibold text-gray-700">MoneyFy</h1>
        <p className="text-gray-600">Connect all your cards</p>
      </div>
      <div className="my-[3rem]">
        <Image height={400} width={400} src={Card} alt="" />
      </div>
      {/* small card section */}
      <div className="flex gap-x-12 mt-[1rem]">
        {smallCardPropsArray.map((props, index) => (
          <SmallCard
            key={index}
            label={props.label}
            icon={props.icon}
            color={props.color}
          />
        ))}
      </div>
      {/* transfer section */}
      <div className="self-start mt-[3rem]">
        <h1 className="text-[3rem] font-semibold text-gray-700">
          Quick Transfer
        </h1>
        <p className="text-gray-600">Transfer money instantly</p>
        <div className="flex items-center gap-x-10 my-[1rem]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Users key={index} user={User} />
          ))}
        </div>
      </div>
      {/* card number section */}
      <div className="self-start mt-[2rem]">
        <h1 className="text-[2rem] font-semibold text-gray-700">Card Number</h1>
        <div className="border-2 border-gray-400 w-[60rem] h-[5rem] flex items-center justify-between px-5 rounded-3xl mt-5">
          <p className="text-gray-600">**** **** **** 1234</p>
          <IoCopyOutline className="text-[2.5rem]" />
        </div>
      </div>
    </div>
  );
}

export default CardSection;
