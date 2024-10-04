import React from "react";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";

interface SmallCardProps {
  label: string;
  icon: string;
  color: string;
}

function SmallCard({ label, icon, color }: SmallCardProps) {
  const IconComponent =
    BiIcons[icon as keyof typeof BiIcons] ||
    GiIcons[icon as keyof typeof GiIcons];

  return (
    <div
      className="w-[15rem] h-[12rem] rounded-[3rem] shadow-lg flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <div className="p-[1rem]">
        {IconComponent && (
          <IconComponent className="text-gray-50 text-[3.5rem] mx-auto" />
        )}
        <h1 className="text-white text-[1.8rem] font-medium">{label}</h1>
      </div>
    </div>
  );
}

export default SmallCard;
