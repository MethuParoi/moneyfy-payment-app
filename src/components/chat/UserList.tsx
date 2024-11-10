/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useChatContext } from "../../context/chatContext";
import {
  useCreateConversationMutation,
  useGetAllUserQuery,
  useLazyCheckConversationQuery,
} from "../../store/features/user/userApi";
import { useRouter } from "next/navigation";

const UserList = () => {
  const router = useRouter();
  const { setChatReceiver } = useChatContext();

  const { data: userData } = useGetAllUserQuery(undefined);
  const [createConversation] = useCreateConversationMutation();
  const [checkConversation] = useLazyCheckConversationQuery();

  const handleStartConversation = async (
    receiverId: string,
    receiverName: string
  ) => {
    const ifConversationExists = await checkConversation(receiverId).unwrap();

    if (ifConversationExists) {
      if (ifConversationExists?.result) {
        router.push(`/chat/${ifConversationExists?.result?._id}`);
      } else {
        const newConversation = await createConversation({
          receiver: receiverId,
        }).unwrap();
        router.push(`/chat/${newConversation?.data?._id}`);
      }

      setChatReceiver({ name: receiverName, userId: receiverId });
    }
  };

  return (
    <div className="p-5 bg-blue-200 flex-1 rounded-tl-[50px] rounded-bl-[50px]">
      <h2 className="text-5xl font-bold text-gray-800 mt-5 mb-14 text-center">
        Users
      </h2>
      <div className="max-h-[70vh] overflow-y-scroll no-scrollbar">
        {userData &&
          userData?.result?.map((user: any) => {
            const { firstName, lastName, _id } = user;
            return (
              <div
                key={_id}
                className="py-5 w-full bg-blue-100 rounded-[5px] shadow-sm overflow-hidden mb-4 text-center hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() =>
                  handleStartConversation(_id, `${firstName} ${lastName}`)
                }
              >
                <h3 className="text-[16px] font-medium text-gray-700">
                  {firstName} {lastName}
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserList;
