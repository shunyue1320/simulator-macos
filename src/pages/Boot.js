import React, { useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";

export default function Boot({ stateMac, setStateMac }) {
  const [percent, setPercent] = useState(0);
  let intervalId = null;

  const startLoading = () => {
    intervalId = setInterval(() => {
      setPercent((p) => {
        if (p++ > 100) {
          clearInterval(intervalId);
          setStateMac("login");
        }
        return p;
      });
    }, 16);
  };

  const handleClick = () => {
    if (stateMac === "sleep") {
      setStateMac("login");
    } else if (stateMac === "shutDown") {
      setStateMac("restart");
      startLoading();
    }
  };

  useEffect(() => {
    if (stateMac === "restart") startLoading();

    return function cleanup() {
      if (intervalId) clearInterval(intervalId);
    };
  });

  return (
    <div
      className="nightwind-prevent nightwind-prevent-block w-full h-full bg-black flex flex-col justify-center items-center select-none"
      onClick={handleClick}
    >
      {stateMac !== "shutDown" && (
        <>
          <FaApple className="text-white -mt-4 w-20 h-20 sm:w-24 sm:h-24" />
          {stateMac === "restart" && (
            <div className="absolute top-1/2 mt-16 sm:mt-24 left-0 right-0 mx-auto w-56 h-1 sm:h-1.5 bg-gray-500 rounded overflow-hidden">
              <span
                className="absolute top-0 bg-white h-full rounded-sm"
                style={{
                  width: `${percent}%`
                }}
              />
            </div>
          )}
          {stateMac === "sleep" && (
            <div className="absolute top-1/2 mt-16 sm:mt-20 left-0 right-0 mx-auto text-sm text-gray-200 text-center">
              Click to wake up
            </div>
          )}
        </>
      )}
    </div>
  );
}
