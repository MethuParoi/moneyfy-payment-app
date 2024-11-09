"use client";

import React from "react";
import { PiPasswordDuotone } from "react-icons/pi";
import { toast } from "react-toastify";

function UpdateUserPin() {
  return (
    <div
      className="w-[15rem] h-[12rem] rounded-[3rem] shadow-lg flex justify-center items-center cursor-pointer bg-[#dfeceb]/50 backdrop-blur-[30px] text-gray-600"
      //   style={{ backgroundColor: color }}
    >
      <div className="p-[1rem]">
        <PiPasswordDuotone className=" text-[3.5rem] mx-auto" />
        <h1 className=" text-[1.8rem] font-medium text-center">Update Pin</h1>
      </div>
    </div>
  );
}

export default UpdateUserPin;
