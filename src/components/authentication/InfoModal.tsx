import { showInfoModal } from "@/store/features/ui/uiSlice";
import { Flashlight, Slice } from "lucide-react";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export const InfoModal = () => {
  const dispatch = useDispatch();
  const setInfo = useSelector((state) => state.ui.showInfo);
  console.log("Info:", setInfo);

  useEffect(() => {
    setTimeout(() => {
      dispatch(showInfoModal(false));
    }, 5000);
  }, [dispatch]);

  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="gap-3 flex flex-col">
          <button
            onClick={() => dispatch(showInfoModal(false))}
            className="place-self-end"
          >
            <IoCloseSharp size={"3.5rem"} />
          </button>

          <div className="min-h-[60rem] min-w-[100rem] bg-gray-100 border-transparent rounded-[5rem] shadow-2xl flex flex-col items-center">
            <h1 className="text-[2.5rem] font-semibold my-4">
              Authentication Result Analysis
            </h1>
            <h2 className="text-[1.8rem] max-w-[90rem]">
              {setInfo.verification_result.detailed_explanation}
            </h2>
            <hr className="w-[90%] bg-gray-600 h-1 mt-2" />
            <div className="flex justify-around items-center my-3 w-[100rem]">
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Confidence: </span>
                {setInfo.verification_result.confidence}
              </h2>
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Threshold: </span>
                {setInfo.verification_result.threshold}
              </h2>
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Processing time: </span>
                {setInfo.verification_result.processing_time}
              </h2>
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Match: </span>
                {setInfo.verification_result.match === false ? "No" : "Yes"}
              </h2>
            </div>
            <hr className="w-[90%] bg-gray-600 h-1 mt-2" />
            <h1 className="text-[2.5rem] font-semibold mt-8 mb-4">
              Technical Details
            </h1>
            <div className="flex justify-around items-center my-3 w-[100rem]">
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Detector: </span>
                {setInfo.technical_details.detector}
              </h2>
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Distance Metric: </span>
                {setInfo.technical_details.distance_metric}
              </h2>
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Model: </span>
                {setInfo.technical_details.model}
              </h2>
              <h2 className="text-[1.8rem]">
                <span className="font-semibold">Raw Distance: </span>
                {setInfo.technical_details.raw_distance.toFixed(2)}
              </h2>
            </div>
            {/* img comparison */}
            <hr className="w-[90%] bg-gray-600 h-1 mt-2" />
            <h1 className="text-[2.5rem] font-semibold mt-8 mb-4">
              Image Comparison
            </h1>
            <div className="flex justify-around items-center my-3 w-[100rem]">
              <div className="flex flex-col gap-y-4">
                <h1 className="text-[2rem] font-semibold  my-4">Live Image</h1>
                <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Age: </span>
                  {setInfo.analysis.live_image.age}
                </h2>
                <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Emotion: </span>
                  {setInfo.analysis.live_image.emotion}
                </h2>
                <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Gender: </span>
                  {setInfo.analysis.live_image.gender}
                </h2>
                {/* <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Raw Distance: </span>
                  {/* {setInfo} }
                </h2> */}
              </div>
              <div className="flex flex-col gap-y-4">
                <h1 className="text-[2rem] font-semibold  my-4">
                  Reference Image
                </h1>
                <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Age: </span>
                  {setInfo.analysis.reference_image.age}
                </h2>
                <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Emotion: </span>
                  {setInfo.analysis.reference_image.emotion}
                </h2>
                <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Gender: </span>
                  {setInfo.analysis.reference_image.gender}
                </h2>
                {/* <h2 className="text-[1.8rem]">
                  <span className="font-semibold">Raw Distance: </span>
                  {/* {setInfo} }
                </h2> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
