"use client";

import CardSection from "@/components/dashboard/CardSection";
import TransactionSection from "@/components/dashboard/TransactionSection";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

function Page() {
  useEffect(() => {
    const user = localStorage.getItem("username");
    toast.success(`Welcome, ${user}`);
  }, []);

  return (
    <div className=" h-screen w-screen flex bg-[#3d7bee]">
      <div className="h-full xl:w-[77rem] bg-[#dfeceb]/50 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
        <CardSection />
      </div>
      <div className="h-full xl:w-[117rem] bg-[#aacdcf]/30 backdrop-blur-[30px] ml-[-7rem] pl-[10rem]">
        <TransactionSection />
      </div>
    </div>
  );
}

export default Page;
