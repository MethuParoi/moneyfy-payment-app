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
import {
  showInfo,
  showInfoModal,
  showModal,
} from "@/store/features/ui/uiSlice";

const AuthModal = ({ authFunction, env = "", photoUrl }) => {
  const { takingUserPhoto, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  //auth token
  const token = "p4danYFjcp6LoOvyhGg5_SKp6wMNtyITufSJHJr8FbA";

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
    const response = await fetch(photoUrl);
    // const response = photoUrl;
    // if (!userData) {
    //   response = await fetch(photoUrl);
    // } else {
    //   response = await fetch(userData.photoUrl);
    // }
    console.log("referenceBlob", response);
    const referenceBlob = await response.blob();
    const liveBlob = await capture();
    // const toastId = toast.loading("Verifying user...");

    // console.log("liveBlob", liveBlob);

    formData.append("reference_image", referenceBlob, "reference.jpg");
    formData.append("live_image", liveBlob, "live.jpg");
    formData.append("user_id", "abdullah");
    formData.append("consent", "true");
    formData.append("retention_period", "30");

    axios
      .post("https://7k8zn1bb-5000.asse.devtunnels.ms/compare", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response) {
          console.log("response", response);
          const { identical } = response.data.verification_result.match;
          if (identical === "Comparison failed") {
            // console.log("Comparison failed");
            toast.error("User not verified!");
            dispatch(showInfo(response.data));
            dispatch(showInfoModal(true));
            // if (env === "logging") {
            //   dispatch(logout());
            // }
            dispatch(takeUserPhotoToggle());
            return;
          }
          if (response.data.verification_result.match === true) {
            // console.log("User verified!");
            toast.success("User verified!");
            dispatch(showInfo(response.data));
            dispatch(showInfoModal(true));
            authFunction();
            // localStorage.setItem("authDetails", JSON.stringify(response.data));
            // router.push("/dashboard");
          } else {
            toast.error("User not verified!");
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
            height={1080}
            width={1920}
            screenshotQuality={1}
            minScreenshotHeight={1000}
            minScreenshotWidth={1000}
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

