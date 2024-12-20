import React from "react";

function ChatBubble({ message }) {
  return (
    <div className="">
      <div className="flex items-start gap-2.5">
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-normal text-gray-500 ">11:46</span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl ">
            <p className="text-3xl font-normal text-gray-900 "> {message}</p>
          </div>
          <span className="text-sm font-normal text-gray-500 ">Delivered</span>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
