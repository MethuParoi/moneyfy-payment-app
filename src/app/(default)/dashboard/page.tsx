"use client";

import CardSection from "../../../components/dashboard/CardSection";
import { Modal } from "../../../components/dashboard/Modal";
import TransactionSection from "../../../components/dashboard/TransactionSection";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "../../../store/features/ui/uiSlice";
import {
  useCheckBalanceMutation,
  useGetTransactionsHistoryMutation,
} from "../../../store/features/transaction/transactionApi";
import { useRouter } from "next/navigation";

function Page() {
  const dispatch = useDispatch();

  //check balance
  const [balance, setBalance] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [checkBalance] = useCheckBalanceMutation();
  const [getTransactionsHistory] = useGetTransactionsHistoryMutation();

  const router = useRouter();
  const token = localStorage.getItem("token");

  const handleBalance = async () => {
    const token = localStorage.getItem("token");
    const checkBalanceResult = await checkBalance({ token }).unwrap();
    if (checkBalanceResult?.success) {
      setBalance(checkBalanceResult.result.balance);
    } else {
      toast.error("Balance data fetching failed");
    }
  };

  const handleTransactionData = async () => {
    const token = localStorage.getItem("token");
    const checkTransaction = await getTransactionsHistory({ token }).unwrap();
    if (checkTransaction?.success) {
      setTransaction(checkTransaction.data);
    } else {
      toast.error("Transaction data fetching failed");
    }
  };

  useEffect(() => {
    // if (!isInitialRender) {
    //   return;
    // }
    // const user = localStorage.getItem("username");
    // toast.success(`Welcome, ${user}`);
    handleBalance();
    handleTransactionData();
    setIsInitialRender(false);
    if (!token) {
      router.push("/signin");
    }
  }, []);

  // useEffect(() => {
  //   handleBalance();
  //   handleTransactionData();
  //   // console.log(transaction);
  // }, []);

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
      <div className=" h-screen w-screen flex bg-[url('/sky-background.webp') bg-blue-400/70">
        {/* <div className=""></div> */}
        <div className="h-full xl:w-[77rem] bg-[#dfeceb]/20 backdrop-blur-[30px] rounded-r-[5rem] ml-[-7rem] pl-[10rem] z-10 border-2 border-white/40 brightness-70">
          <CardSection />
        </div>
        <div className="h-full xl:w-[117rem] bg-[#dfeceb]/10  backdrop-blur-[30px] ml-[-7rem] pl-[10rem]">
          <TransactionSection transactionData={transaction} balance={balance} />
        </div>
      </div>
    </>
  );
}

export default Page;
