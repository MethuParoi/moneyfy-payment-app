"use client";

import { setIcon, setLabel, showModal } from "../../store/features/ui/uiSlice";
import React from "react";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface SmallCardProps {
  label: string;
  icon: string;
  color: string;
}

function SmallCard({ label, icon, color }: SmallCardProps) {
  const dispatch = useDispatch();

  const IconComponent =
    BiIcons[icon as keyof typeof BiIcons] ||
    GiIcons[icon as keyof typeof GiIcons];

  return (
    <div
      className="w-[15rem] h-[12rem] rounded-[3rem] shadow-lg flex justify-center items-center cursor-pointer backdrop-blur"
      style={{ backgroundColor: color, opacity: 0.8 }}
      onClick={() => {
        dispatch(showModal(true));
        dispatch(setLabel(label));
        dispatch(setIcon(icon));
      }}
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
