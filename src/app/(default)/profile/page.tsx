"use client";

import React from "react";
// import "./Profile.css";
import ProfileImageSection from "../../../components/profile/ProfileImageSection";
import ProfileModal from "../../../components/profile/ProfileModal";
import { CgProfile } from "react-icons/cg";
import ProfileDesc from "../../../components/profile/ProfileDesc";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { img } from "../../../images/dashboard/user.png";
import UpdateUserPin from "../../../components/profile/UpdateUserPin";
import SetUserPin from "../../../components/profile/SetUserPin";
import PinModal from "../../../components/profile/PinModal";
import { usePinInfoQuery } from "../../../store/features/user/userApi";
import { toast } from "react-toastify";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("");
  //   const { userData } = useSelector((state) => state.user);
  //   const { accountNumber, fullName, email, photoUrl } = userData;
  const { data: pinInfo } = usePinInfoQuery();

  const accountNumber = localStorage.getItem("accountNumber");
  const fullName = localStorage.getItem("fullname");
  const email = localStorage.getItem("email");
  const photoUrl = localStorage.getItem("photoUrl");

  console.log("photoUrl", photoUrl);

  const handlePinInfo = () => {
    if (pinInfo?.result?.pinExist) {
      toast.error("Pin already exists");
      return true;
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const router = useRouter();
  return (
    <div className="min-h-screen w-full ml-[-5rem] pl-[7rem] pr-[2rem] text-gray-700 bg-[url('/sky-background.webp') bg-blue-400/70">
      <div className="flex items-center justify-between pt-10 px-5">
        <div
          className="cursor-pointer hover:text-gray-600"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <p className="text-[3rem] font-semibold pl-3">Moneyfy</p>
        </div>

        <div className="flex items-center">
          <div>
            <CgProfile size={"3rem"} />
          </div>
          <div>
            <p className="text-[2.5rem] font-semibold pl-3">profile</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 border-transparent mt-10 px-8 pt-14 pb-20  rounded-[4rem] shadow-xl h-[50rem] bg-[#dfeceb]/30 backdrop-blur-[30px]">
        <div className="flex items-center justify-center">
          <div className="">
            <ProfileImageSection
              profileImage={photoUrl}
              handleEdit={handleEdit}
            />
          </div>
        </div>

        <div className="col-span-2 self-center ml-[-15rem]">
          <ProfileDesc
            name={fullName}
            mail={email}
            contact={accountNumber}
            address={"New York, USA"}
          />
        </div>
      </div>
      <div className="mt-[3rem] flex items-center justify-center gap-x-24 mx-auto">
        <div
          onClick={() => {
            if (handlePinInfo()) {
              return;
            }
            handleEdit();
            setType("setPin");
          }}
        >
          <SetUserPin />
        </div>
        <div
          onClick={() => {
            handleEdit();
            setType("updatePin");
          }}
        >
          <UpdateUserPin />
        </div>
      </div>
      <div>{edit && <ProfileModal handleEdit={handleEdit} />}</div>
      <div>{edit && <PinModal handleEdit={handleEdit} type={type} />}</div>
    </div>
  );
};

export default Profile;
