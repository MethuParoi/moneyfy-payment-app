"use client";

import React, { useState } from "react";
import Img from "next/image";
import profile from "../../images/dashboard/user.png";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";

interface TransactionRowsProps {
  name: string;
  amount: string;
  date: string;
  status: string;
}

function TransactionRows({ name, amount, date, status }: TransactionRowsProps) {
  //   const [currentStatus, setCurrentStatus] = useState("Pending");
  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-5 my-[2.5rem]">
      <div className="flex items-center gap-x-5">
        <Img width={40} height={40} src={profile} alt="" />
        <p className="text-[2rem] font-semibold text-gray-700">{name}</p>
      </div>

      <div className="flex items-center gap-x-3">
        {status === "Completed" ? (
          <IoCheckmarkDoneCircleSharp className="text-[3.5rem] text-green-600" />
        ) : (
          <FaCircleExclamation className="text-[3rem] text-red-700" />
        )}
        <p className="text-[2rem] font-semibold text-gray-700">{status}</p>
      </div>

      <div>
        <p className="text-[2rem] font-semibold text-gray-700">{date}</p>
      </div>

      <div className="flex items-center justify-center w-[10rem] h-[4rem] rounded-2xl bg-slate-300 opacity-70 backdrop-blur-md">
        <p className="text-[2rem] font-semibold text-gray-700 ">{amount}</p>
      </div>
    </div>
  );
}

export default TransactionRows;
