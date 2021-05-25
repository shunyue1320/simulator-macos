import React from "react";

function TrafficLights({ setShow, max, setMax }) {
  const closeWindow = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  return (
    <div className="flex flex-row absolute left-0 space-x-2 pl-2 mt-1.5">
      <button
        onClick={closeWindow}
        className="w-3 h-3 rounded-full bg-red-500 outline-none focus:outline-none"
      />
      <button
        onClick={() => setMax(false)}
        className="w-3 h-3 rounded-full bg-yellow-500 outline-none focus:outline-none"
      />
      <button
        onClick={() => setMax(!max)}
        className="w-3 h-3 rounded-full bg-green-500 outline-none focus:outline-none"
      />
    </div>
  );
}

export default function Window({
  content,
  title,
  show,
  setShow,
  max,
  setMax,
  active,
  z,
  size
}) {
  const minSize = size ? `${size} mt-16 mb-24` : "h-3/4 w-1/2 mt-16 mb-24";
  const windowSize = max ? "w-full h-full" : minSize;
  const round = max ? "rounded-none" : "rounded-lg";

  if (!show) {
    return <div />;
  }

  return (
    <div
      style={{ zIndex: z }}
      onClick={() => active(title)}
      className={`absolute transition-hw ${round} overflow-y-hidden bg-white ${windowSize} shadow-md`}
    >
      <div
        onDoubleClick={() => setMax(!max)}
        className="relative h-6 text-center bg-gray-300"
      >
        <TrafficLights setShow={setShow} max={max} setMax={setMax} />
        <span className="font-semibold text-gray-700">{title}</span>
      </div>
      <div className="innner-window w-full overflow-y-hidden">{content}</div>
    </div>
  );
}
