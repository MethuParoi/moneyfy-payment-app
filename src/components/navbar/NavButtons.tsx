import React from "react";
import { IconType } from "react-icons";

interface NavButtonsProps {
  icon: IconType;
  onClick: () => void;
}

function NavButtons({ icon: IconComponent, onClick }: NavButtonsProps) {
  return (
    <div
      className="flex items-center justify-center h-[5rem] w-[5rem] cursor-pointer hover:bg-cyan-700 my-[3rem] rounded-full"
      onClick={onClick}
    >
      <div className="p-[1rem]">
        <IconComponent className="text-gray-50 text-[3.5rem] mx-auto" />
      </div>
    </div>
  );
}

export default NavButtons;
