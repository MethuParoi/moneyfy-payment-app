import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import {
  usePinInfoQuery,
  useSetPinMutation,
  useUpdatePinMutation,
} from "../../store/features/user/userApi";
import { toast } from "react-toastify";

const PinModal = ({ handleEdit, type }) => {
  const [newPin, setNewPin] = useState();
  const [oldPin, setOldPin] = useState();
  const [updatePin, setUpdatePin] = useState();
  //RTK Query
  const [setUserPin] = useSetPinMutation();
  const [updateUserPin] = useUpdatePinMutation();

  const setPin = async () => {
    try {
      await setUserPin({ pin: Number(newPin) }).unwrap();
      toast.success("Pin set successfully");
      handleEdit();
    } catch (error) {
      toast.error("Failed to set pin");
    }
  };

  const editPin = async () => {
    try {
      await updateUserPin({
        oldPin: Number(oldPin),
        newPin: Number(updatePin),
      }).unwrap();
      toast.success("Pin updated successfully");
      handleEdit();
    } catch (error) {
      toast.error("Failed to update pin");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "setPin") {
      setPin();
    } else {
      editPin();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <div className="gap-3 flex flex-col">
        <button onClick={handleEdit} className="place-self-end">
          <IoCloseSharp size={"3.5rem"} />
        </button>

        <div className="min-h-[40rem] min-w-[60rem] bg-gray-100 border-transparent rounded-[5rem] shadow-2xl flex flex-col items-center">
          <div className="pb-10">
            <h2 className="text-3xl font-semibold pt-10">
              {type === "setPin" ? "Set Pin" : "Update Pin"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {type === "setPin" ? (
              <>
                <div className="pb-7">
                  <input
                    onChange={(e) => setNewPin(e.target.value)}
                    className="p-3 w-[25rem] rounded-xl border-transparent shadow-md"
                    type="number"
                    name="pin"
                    id="pin"
                    placeholder="Set new pin"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="pb-7">
                  <input
                    onChange={(e) => setOldPin(e.target.value)}
                    className="p-3 w-[25rem] rounded-xl border-transparent shadow-md"
                    type="number"
                    name="oldPin"
                    id="oldPin"
                    placeholder="Type old pin"
                  />
                </div>

                <div className="pb-7">
                  <input
                    onChange={(e) => setUpdatePin(e.target.value)}
                    className="p-3 w-[25rem] rounded-xl border-transparent shadow-md"
                    type="number"
                    name="newPin"
                    id="newPin"
                    placeholder="Type new pin"
                  />
                </div>
              </>
            )}

            <div className="pt-10 ml-32">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-600 hover:text-white px-8 p-3 rounded-xl shadow-md text-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
