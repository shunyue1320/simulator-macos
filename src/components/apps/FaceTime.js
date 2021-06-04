import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "user"
};

export default function FaceTime() {
  const webcamRef = useRef();
  const [img, setImg] = useState(null);
  const [pat, setPat] = useState(0);

  return (
    <>
      {pat ? (
        <div
          id="container"
          className="nightwind-prevent nightwind-prevent-block border-8 bg-gray-800 h-full flex space-y-6 flex-col justify-center items-center"
        >
          {img && <img className="max-h-60 md:max-h-96" src={img} alt="img" />}
          <button
            className="mx-auto outline-none focus:outline-none items-center justify-center bg-white h-12 w-12 border border-black border-opacity-50 rounded-full"
            onClick={() => setPat(false)}
          />
        </div>
      ) : (
        <div
          id="container"
          className="nightwind-prevent nightwind-prevent-block bg-gray-800 h-full flex space-y-2 flex-col justify-center items-center"
        >
          <Webcam
            className="border-8 max-h-96"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button
            className="mx-auto outline-none focus:outline-none items-center justify-center bg-white h-12 w-12 border border-black border-opacity-50 rounded-full"
            onClick={() => {
              setPat(true);
              setImg(webcamRef.current.getScreenshot());
            }}
          />
        </div>
      )}
    </>
  );
}
