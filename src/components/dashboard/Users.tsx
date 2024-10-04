import { StaticImageData } from "next/image";
import Img from "next/image";
import React from "react";

function Users({ user }: { user: StaticImageData }) {
  return (
    <div>
      <Img src={user.src} width={60} height={60} alt="" />
    </div>
  );
}

export default Users;
