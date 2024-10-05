import React from "react";
import { LuSearch } from "react-icons/lu";
import TransactionRows from "./TransactionRows";

import { Chart } from "./Chart";

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

function TransactionSection() {
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
          <button className="border-2 border-gray-400 text-white px-5 py-5 rounded-[50%] ml-5">
            <LuSearch className="text-gray-600 text-[3.5rem] " />
          </button>
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
