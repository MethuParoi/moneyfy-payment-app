"use client";

import CardSection from "@/components/dashboard/CardSection";
import { Modal } from "@/components/dashboard/Modal";
import TransactionSection from "@/components/dashboard/TransactionSection";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "@/store/features/ui/uiSlice";

function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("username");
    toast.success(`Welcome, ${user}`);
  }, []);

  // const [showModal, setShowModal] = useState(true);
  const setModal = useSelector((state) => state.ui.showModal);
  const label = useSelector((state) => state.ui.label);
  const icon = useSelector((state) => state.ui.icon);
  console.log(icon);
  // const [handleModal, setHandleModal] = useState(false);

  return (
    <>
      {setModal && (
        <Modal
          heading={label}
          logo={icon}
          modalHandler={() => {
            dispatch(showModal(false));
            // console.log("btn clicked");
            // setShowModal(false);
          }}
        />
      )}
      <div className=" h-screen w-screen flex bg-[#3d7bee]">
        <div className="h-full xl:w-[77rem] bg-[#dfeceb]/50 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
          <CardSection />
        </div>
        <div className="h-full xl:w-[117rem] bg-[#aacdcf]/30 backdrop-blur-[30px] ml-[-7rem] pl-[10rem]">
          <TransactionSection />
        </div>
      </div>
    </>
  );
}

export default Page;
