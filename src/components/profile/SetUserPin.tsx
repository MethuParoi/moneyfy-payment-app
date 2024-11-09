"use client";

import React from "react";

import { TbPasswordFingerprint } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function SetUserPin() {
  //   const dispatch = useDispatch();

  return (
    <div className="w-[15rem] h-[12rem] rounded-[3rem] shadow-lg flex justify-center items-center cursor-pointer bg-[#dfeceb]/50 backdrop-blur-[30px]">
      <div className="p-[1rem]">
        <TbPasswordFingerprint className="text-gray-600 text-[3.5rem] mx-auto" />
        <h1 className="text-gray-600 text-[1.8rem] font-medium">
          Set User Pin
        </h1>
      </div>
    </div>
  );
}

export default SetUserPin;
