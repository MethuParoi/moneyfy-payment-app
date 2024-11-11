import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

export const InfoModal = ({ modalHandler }) => {
  const setInfo = useSelector((state) => state.ui.showInfo);
  console.log("Info:", setInfo);

  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className=" gap-3 flex flex-col">
          <button onClick={modalHandler} className="place-self-end">
            <IoCloseSharp size={"3.5rem"} />
          </button>

          <div className="min-h-[40rem] min-w-[60rem] bg-gradient-to-r from-emerald-400 to-cyan-400 border-transparent rounded-[5rem] shadow-2xl flex flex-col items-center">
            <h1>Authentication Result Analysis</h1>
          </div>
        </div>
      </div>
    </>
  );
};
