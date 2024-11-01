"use client";

import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import TransactionRows from "./TransactionRows";

import { Chart } from "./Chart";
import { BiDollar } from "react-icons/bi";
import { useCheckBalanceMutation } from "@/store/features/transaction/transactionApi";
import { toast } from "react-toastify";

const transactionRows = [
  {
    name: "John Doe",
    amount: "$100",
    date: "12/12/2021",
    status: "Pending",
  },
  {
    name: "Jane Doe",
    amount: "$200",
    date: "12/12/2021",
    status: "Completed",
  },
  {
    name: "John Doe",
    amount: "$100",
    date: "12/12/2021",
    status: "Pending",
  },
  {
    name: "Jane Doe",
    amount: "$200",
    date: "12/12/2021",
    status: "Completed",
  },
  {
    name: "John Doe",
    amount: "$100",
    date: "12/12/2021",
    status: "Pending",
  },
  {
    name: "Jane Doe",
    amount: "$200",
    date: "12/12/2021",
    status: "Completed",
  },
];

function TransactionSection({ balance }) {
  // const [balance, setBalance] = useState(0);
  // const [checkBalance] = useCheckBalanceMutation();

  // const handleBalance = async () => {
  //   const token = localStorage.getItem("token");
  //   const checkBalanceResult = await checkBalance({ token }).unwrap();
  //   if (checkBalanceResult?.success) {
  //     setBalance(checkBalanceResult.result.balance);
  //     toast.success(checkBalanceResult.message);
  //   } else {
  //     toast.error("Transaction failed");
  //   }
  // };

  // useEffect(() => {
  //   handleBalance();
  // }, []);

  return (
    <div className="ml-[2rem]">
      <div className="flex items-center justify-between  mr-[4rem] mt-[4rem]">
        <div>
          <h1 className="text-[3rem] font-semibold text-gray-700">
            Transactions
          </h1>
          <p className="text-gray-600">Current transfers</p>
        </div>
        <div>
          <div className="border-2 border-gray-300  px-5 py-5 rounded-xl ml-5 flex items-center justify-around text-gray-200 font-semibold">
            <div>
              <BiDollar className="text-[2.5rem]" />
            </div>
            <p className="text-[2rem]">{balance}</p>
          </div>
        </div>
      </div>
      {/* transaction rows */}
      <div>
        {transactionRows.map((transaction, index) => (
          <TransactionRows
            key={index}
            name={transaction.name}
            amount={transaction.amount}
            date={transaction.date}
            status={transaction.status}
          />
        ))}
      </div>
      {/* charts */}
      <div className="grid grid-cols-2 w-[90rem] h-[35rem] border border-white/10 rounded-[12px] backdrop-blur-[20px] bg-white/10 mt-[2rem]">
        <Chart />

        <div className="grid grid-cols-2  mt-[8rem]">
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-700">Income</h1>
            <p className="text-gray-600">$500</p>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-700">
              Expenses
            </h1>
            <p className="text-gray-600">$200</p>
          </div>

          <div>
            <h1 className="text-[2rem] font-semibold text-gray-700">
              Total Income
            </h1>
            <p className="text-gray-600">$300</p>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-700">
              Total Expenses
            </h1>
            <p className="text-gray-600">$200</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionSection;
