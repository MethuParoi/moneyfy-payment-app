import React from "react";

const ProfileDesc = ({ name, mail, contact, address }) => {
  return (
    <div className="pl-20 pt-16 pr-36 text-gray-600 font-semibold">
      <div className="pb-3 border-b-2 border-blue-400">
        <h1 className="text-3xl font-semibold">{name}</h1>
      </div>

      <div className="pt-5 pb-3 border-b-2 border-blue-400">
        <h1 className="text-3xl">{mail}</h1>
      </div>

      <div className="pt-5 pb-3 border-b-2 border-blue-400">
        <h1 className="text-3xl">{contact}</h1>
      </div>

      <div className="pt-5">
        <h1 className="text-3xl">{address}</h1>
      </div>
    </div>
  );
};

export default ProfileDesc;
