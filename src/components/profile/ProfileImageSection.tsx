import { MdEdit } from "react-icons/md";
import Img from "next/image";

const ProfileImageSection = ({ profileImage, handleEdit }) => {
  return (
    <div className="pt-20 pr-14 border-r-2 border-blue-400 relative">
      <div>
        <Img
          src={profileImage}
          alt="profile"
          className="rounded-full w-[25rem] h-[25rem] border-4 border-blue-400 shadow-lg p-5"
        />
      </div>

      <div
        onClick={handleEdit}
        className="absolute top-[28rem] left-[22rem] cursor-pointer"
      >
        <MdEdit className="text-[3rem] text-blue-500" />
      </div>
    </div>
  );
};

export default ProfileImageSection;
