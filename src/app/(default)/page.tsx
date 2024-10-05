import CardSection from "@/components/dashboard/CardSection";
import TransactionSection from "@/components/dashboard/TransactionSection";
import React from "react";

function page() {
  return (
    <div className=" h-screen w-screen flex bg-[#9cb7bd]">
      <div className="h-full xl:w-[77rem] bg-[#dfeceb]/50 backdrop-blur-md rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
        <CardSection />
      </div>
      <div className="h-full xl:w-[117rem] bg-[#aacdcf]/30 backdrop-blur-md ml-[-7rem] pl-[10rem]">
        <TransactionSection />
      </div>
    </div>
  );
}

export default page;
