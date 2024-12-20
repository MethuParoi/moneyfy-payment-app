import { IoCloseSharp } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { BiMoneyWithdraw, BiTransfer } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddMoneyMutation,
  useMakeTransactionMutation,
  useSendMoneyMutation,
} from "../../store/features/transaction/transactionApi";
import { toast } from "react-toastify";
import { takeUserPhotoToggle } from "../../store/features/user/userSlice";
import AuthModal from "../ui/AuthModal/AuthModal";
// import { toast } from "sonner";
// import AuthModal from "../../../components/ui/AuthModal/AuthModal";
// import { takeUserPhotoToggle } from "../../../redux/features/user/userSlice";

function convertToSlug(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

// Create a mapping of string values to components
const iconMapping = {
  BiMoneyWithdraw: BiMoneyWithdraw,
  GiReceiveMoney: GiReceiveMoney,
  BiTransfer: BiTransfer,
};

export const Modal = ({ modalHandler, heading, logo, handleBalance }) => {
  const [amount, setAmount] = useState("");
  const [transUser, setTransUser] = useState("");
  const { userData } = useSelector((state) => state.user);
  //   const { username } = userData;
  const [sendMoney] = useSendMoneyMutation();
  const [addMoney] = useAddMoneyMutation();
  const dispatch = useDispatch();
  const photoUrl = localStorage.getItem("photoUrl");

  const receiverNotNeededTransactions = ["Add Money", "Request Loan"];

  const handleTransaction = async () => {
    let transObj;
    const transactionType = convertToSlug(heading);

    if (transactionType === "add-money") {
      transObj = {
        amount: Number(amount),
        // transactionType,
        // receiver: username,
        // transactionMadeBy: username,
      };
      const addMoneyResult = await addMoney(transObj).unwrap();
      console.log("add money:", addMoneyResult);
      if (addMoneyResult?.success) {
        toast.success(addMoneyResult.message);
        handleBalance();
        modalHandler();
      } else {
        toast.error("Transaction failed");
      }
    } else {
      transObj = {
        amount: Number(amount),
        transactionType,
        receiver: Number(transUser),
        // sender: username,
        // transactionMadeBy: username,
      };
    }
    // const loading = toast.loading("Transaction processing...");
    const transactionResult = await sendMoney(transObj).unwrap();
    if (transactionResult?.success) {
      toast.success(transactionResult.message);
      modalHandler();
    } else {
      toast.error("Transaction failed", { id: loading });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(takeUserPhotoToggle());
    // await handleTransaction();
  };

  const IconComponent = iconMapping[logo];

  return (
    <>
      <AuthModal
        authFunction={handleTransaction}
        env="logging"
        photoUrl={photoUrl}
      />
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className=" gap-3 flex flex-col">
          <button onClick={modalHandler} className="place-self-end">
            <IoCloseSharp size={"3.5rem"} />
          </button>

          <div className="min-h-[40rem] min-w-[60rem] bg-gradient-to-r from-emerald-400 to-cyan-400 border-transparent rounded-[5rem] shadow-2xl flex flex-col items-center">
            <div>
              <h2 className="text-3xl font-semibold pt-10">{heading}</h2>
            </div>

            <div className="bg h-24 w-24 rounded-full bg-amber-400 flex items-center justify-center mt-10 mb-6">
              <div>
                <button className=" ">
                  {IconComponent && <IconComponent size={"4rem"} />}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="pt-5">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="p-3 rounded-xl border-transparent shadow-md"
                />
              </div>
              {!receiverNotNeededTransactions.includes(heading) && (
                <div className="pt-5">
                  <input
                    type="number"
                    value={transUser}
                    onChange={(e) => setTransUser(e.target.value)}
                    placeholder="Enter receiver userid"
                    className="p-3 rounded-xl border-transparent shadow-md"
                  />
                </div>
              )}
              <div className="pt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-600 hover:text-white px-8 p-3 rounded-xl shadow-md text-xl"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
