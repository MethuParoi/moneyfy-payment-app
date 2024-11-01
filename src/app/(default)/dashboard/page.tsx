"use client";

import CardSection from "@/components/dashboard/CardSection";
import { Modal } from "@/components/dashboard/Modal";
import TransactionSection from "@/components/dashboard/TransactionSection";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "@/store/features/ui/uiSlice";
import { useCheckBalanceMutation } from "@/store/features/transaction/transactionApi";

function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("username");
    toast.success(`Welcome, ${user}`);
  }, []);

  //check balance
  const [balance, setBalance] = useState(0);
  const [checkBalance] = useCheckBalanceMutation();

  const handleBalance = async () => {
    const token = localStorage.getItem("token");
    const checkBalanceResult = await checkBalance({ token }).unwrap();
    if (checkBalanceResult?.success) {
      setBalance(checkBalanceResult.result.balance);
    } else {
      toast.error("Transaction failed");
    }
  };

  useEffect(() => {
    handleBalance();
  }, []);

  // const [showModal, setShowModal] = useState(true);
  const setModal = useSelector((state) => state.ui.showModal);
  const label = useSelector((state) => state.ui.label);
  const icon = useSelector((state) => state.ui.icon);

  return (
    <>
      {setModal && (
        <Modal
          heading={label}
          logo={icon}
          modalHandler={() => {
            dispatch(showModal(false));
          }}
          handleBalance={handleBalance}
        />
      )}
      <div className=" h-screen w-screen flex bg-[#3d7bee]">
        <div className="h-full xl:w-[77rem] bg-[#dfeceb]/50 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
          <CardSection />
        </div>
        <div className="h-full xl:w-[117rem] bg-[#aacdcf]/30 backdrop-blur-[30px] ml-[-7rem] pl-[10rem]">
          <TransactionSection balance={balance} />
        </div>
      </div>
    </>
  );
}

export default Page;
