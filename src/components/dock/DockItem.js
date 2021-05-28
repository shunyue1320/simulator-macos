import React, { useRef, useState, useCallback, useEffect } from "react";
import useRaf from "@rooks/use-raf";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const baseWidth = 50;
const distanceLimit = baseWidth * 6;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.5,
  baseWidth * 2,
  baseWidth * 1.5,
  baseWidth * 1.1,
  baseWidth
];
const beyondTheDistanceLimit = distanceLimit + 1;

const useDockHoverAnimation = (mouseX, ref) => {
  const distance = useMotionValue(beyondTheDistanceLimit);
  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1300,
      damping: 82
    }
  );

  const width = useTransform(widthPX, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();
      // imgCenterX = 当前图标中心距离右边的长度
      const imgCenterX = rect.left + rect.width / 2;
      // 当前鼠标在"底部app导航栏"的X轴位置 - 当前图标中心距离左边的长度
      const distanceDelta = mouseXVal - imgCenterX;
      // distanceDelta 值越接近0则放大效果越明显，(鼠标越接近图标中心则该图标越大)
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width, widthPX };
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(document.body.offsetWidth);

  const onResize = useCallback(() => {
    setWidth(document.body.offsetHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return width;
};

export default function DockItem({
  id,
  title,
  img,
  mouseX,
  desktop,
  openApp,
  isOpen,
  link
}) {
  const imgRef = useRef();
  const { width } = useDockHoverAnimation(mouseX, imgRef);
  const windowWidth = useWindowWidth();

  return (
    <li
      id={`dock-${id}`}
      onClick={desktop || id === "launchpad" ? () => openApp(id) : () => {}}
      className="flex flex-col items-center justify-end mb-1 transition duration-150 ease-in origin-bottom"
    >
      <p className="tooltip text-black text-sm absolute -top-full px-3 py-1 bg-gray-300 bg-opacity-80 blur-sm rounded-md">
        {title}
      </p>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <motion.img
            className="w-12"
            ref={imgRef}
            src={img}
            alt={title}
            title={title}
            draggable={false}
            style={windowWidth < 640 ? {} : { width, willChange: "width" }}
          />
        </a>
      ) : (
        <motion.img
          className="w-12"
          ref={imgRef}
          src={img}
          alt={title}
          title={title}
          draggable={false}
          style={windowWidth < 640 ? {} : { width, willChange: "width" }}
        />
      )}
      <div
        className={`h-1 w-1 m-0 rounded-full bg-gray-800 ${
          isOpen ? "" : "invisible"
        }`}
      />
    </li>
  );
}
