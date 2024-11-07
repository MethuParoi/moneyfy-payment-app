import React from "react";
import { FaUserCircle } from "react-icons/fa";

function UserList({ user }) {
  return (
    <div className="pl-[8rem] my-1 py-4 flex items-center gap-x-6  backdrop-blur-[30px] cursor-pointer hover:bg-[#dfeceb91]">
      <div>
        <FaUserCircle className="text-[4rem]" />
      </div>
      <h2 className="text-3xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
    </div>
  );
}

export default UserList;
