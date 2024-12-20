"use client";

import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import TransactionRows from "./TransactionRows";

import { Chart } from "./Chart";
import { BiDollar } from "react-icons/bi";
import { useCheckBalanceMutation } from "../../store/features/transaction/transactionApi";
import { toast } from "react-toastify";

function TransactionSection({ balance, transactionData }) {
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

      <div className="flex flex-col justify-between">
        {/* transaction rows */}
        <div className="h-[40rem] overflow-y-hidden">
          {transactionData
            .slice()
            .reverse()
            .map((transaction, index) => (
              <TransactionRows
                key={index}
                transactionType={transaction.transactionType}
                amount={transaction.amount}
                date={transaction.createdAt}
                status={"Completed"}
              />
            ))}
        </div>
        {/* charts */}
        <div className="grid grid-cols-2 w-[90rem] h-[35rem] border border-white/10 rounded-[12px] backdrop-blur-[20px] bg-white/10 my-[1rem]">
          <Chart />
          {/* <Chart transactionData={transactionData} /> */}

          <div className="grid grid-cols-2  mt-[8rem]">
            <div>
              <h1 className="text-[2rem] font-semibold text-gray-700">
                Income
              </h1>
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
    </div>
  );
}

export default TransactionSection;
