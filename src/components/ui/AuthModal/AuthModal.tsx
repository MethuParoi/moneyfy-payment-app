// /* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./AuthModal.css";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  logout,
  takeUserPhotoToggle,
} from "../../../store/features/user/userSlice";
import { ImCross } from "react-icons/im";
import { dataURItoBlob } from "../../../utils/authModal.utils";
import { toast } from "react-toastify";
import Img from "next/image";
import { useRouter } from "next/navigation";

const AuthModal = ({ authFunction, env = "", photoUrl = "" }) => {
  const { takingUserPhoto, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleCancelModal = () => {
    dispatch(takeUserPhotoToggle());
  };

  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    setCapturedImage(blob);
    return blob;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    let response;
    if (!userData) {
      response = await fetch(photoUrl);
    } else {
      response = await fetch(userData.photoUrl);
    }
    const referenceBlob = await response.blob();
    const liveBlob = await capture();
    // const toastId = toast.loading("Verifying user...");

    formData.append("reference_image", referenceBlob, "reference.jpg");
    formData.append("live_image", liveBlob, "live.jpg");

    axios
      .post("http://localhost:5000/compare", formData)
      .then((response) => {
        if (response?.data) {
          const { identical } = response.data;
          if (identical === "Comparison failed") {
            toast.error("User not verified!", { id: toastId });
            if (env === "logging") {
              dispatch(logout());
            }
            dispatch(takeUserPhotoToggle());
            return;
          }
          if (response.data.identical === true) {
            authFunction();
            toast.success("User verified!", { id: toastId });
            // router.push("/dashboard");
          } else {
            toast.error("User not verified!", { id: toastId });
          }
        }
        setCapturedImage(null);
        dispatch(takeUserPhotoToggle());
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={`auth-modal-container ${!takingUserPhoto && "hidden"}`}>
      <div className="auth-modal">
        <button
          onClick={handleCancelModal}
          className="auth-cancel-button bg-slate-400 hover:bg-slate-600 duration-200"
        >
          {" "}
          <ImCross />{" "}
        </button>
        <div className="webcam">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: "500" }}
          />
          {capturedImage && (
            <div className="captured-webcam">
              <h2 className=" font-semibold text-gray-500 mb-1">
                Captured Photo:
              </h2>
              <Img
                src={URL.createObjectURL(capturedImage)}
                alt="Captured"
                width="100"
                height="100"
              />
            </div>
          )}
          <div className="auth-func-btns">
            <button
              className=" bg-blue-900 hover:bg-gray-800 text-white duration-200"
              onClick={capture}
            >
              Capture
            </button>
            <button
              className=" bg-red-500 hover:bg-red-700 text-white duration-200"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

//---------------------------------------------------------------------

/* eslint-disable react/prop-types */
// import { useRef, useState } from "react";
// import "./AuthModal.css";
// import Webcam from "react-webcam";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import {
//   logout,
//   takeUserPhotoToggle,
// } from "../../../store/features/user/userSlice";
// import { ImCross } from "react-icons/im";
// import { dataURItoBlob } from "../../../utils/authModal.utils";
// import { toast } from "react-toastify";
// import Img from "next/image";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// const AuthModal = ({ authFunction, env = "", photoUrl = "" }) => {
//   const { takingUserPhoto, userData } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const router = useRouter();

//   const handleCancelModal = () => {
//     dispatch(takeUserPhotoToggle());
//   };

//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const capture = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     const blob = dataURItoBlob(imageSrc);
//     setCapturedImage(blob);
//     return blob;
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     let response;
//     if (!userData) {
//       response = await fetch(photoUrl);
//     } else {
//       response = await fetch(userData.photoUrl);
//     }
//     const referenceBlob = await response.blob();
//     const liveBlob = await capture();
//     const toastId = toast.loading("Verifying user...");

//     formData.append("reference_image", referenceBlob, "reference.jpg");
//     formData.append("live_image", liveBlob, "live.jpg");

//     axios
//       .post("http://localhost:5000/compare", formData)
//       .then((response) => {
//         if (response?.data) {
//           const { identical } = response.data;
//           if (identical === "Comparison failed") {
//             toast.error("User not verified!", { id: toastId });
//             if (env === "logging") {
//               dispatch(logout());
//             }
//             dispatch(takeUserPhotoToggle());
//             return;
//           }
//           if (response.data.identical === true) {
//             authFunction();
//             toast.success("User verified!", { id: toastId });
//             Cookies.set("authToken", "your-auth-token", { expires: 1 }); // Set auth token
//             router.push("/dashboard");
//           } else {
//             toast.error("User not verified!", { id: toastId });
//           }
//         }
//         setCapturedImage(null);
//         dispatch(takeUserPhotoToggle());
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className={`auth-modal-container ${!takingUserPhoto && "hidden"}`}>
//       <div className="auth-modal">
//         <button
//           onClick={handleCancelModal}
//           className="auth-cancel-button bg-slate-400 hover:bg-slate-600 duration-200"
//         >
//           {" "}
//           <ImCross />{" "}
//         </button>
//         <div className="webcam">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             style={{ width: "500" }}
//           />
//           {capturedImage && (
//             <div className="captured-webcam">
//               <h2 className=" font-semibold text-gray-500 mb-1">
//                 Captured Photo:
//               </h2>
//               <Img
//                 src={URL.createObjectURL(capturedImage)}
//                 alt="Captured"
//                 width="100"
//                 height="100"
//               />
//             </div>
//           )}
//           <div className="auth-func-btns">
//             <button
//               className=" bg-blue-900 hover:bg-gray-800 text-white duration-200"
//               onClick={capture}
//             >
//               Capture
//             </button>
//             <button
//               className=" bg-red-500 hover:bg-red-700 text-white duration-200"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;
