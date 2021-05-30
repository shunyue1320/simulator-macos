import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import {
  toggleDark,
  toggleWIFI,
  toggleAirdrop,
  toggleBleutooth,
  toggleFullScreen
} from "../../redux/action";
import music from "../../configs/music";

import { FiBluetooth } from "react-icons/fi";
import {
  BsBrightnessAltHigh,
  BsPlayFill,
  BsPauseFill,
  BsFullscreen,
  BsFullscreenExit
} from "react-icons/bs";
import { IoSunny, IoMoon, IoVolumeHigh } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";

const SliderComponent = ({ icon, value, setValue }) => {
  return (
    <div className="slider flex flex-row w-full">
      <div className="h-8 p-2 bg-gray-100 rounded-l-full border-t border-l border-b border-gray-400 border-opacity-60">
        {icon}
      </div>
      <Slider
        min={1}
        max={100}
        value={value}
        tooltip={false}
        orientation="horizontal"
        onChange={(v) => setValue(v)}
      />
    </div>
  );
};

class ControlCenterMenu extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(e) {
    if (this.ref.current.contains(e.target)) return;
    this.props.toggleMenu(false);
  }

  render() {
    const {
      toggleWIFI,
      toggleBleutooth,
      toggleDark,
      toggleFullScreen,
      dark,
      wifi,
      bluetooth,
      airdrop,
      fullscreen,
      brightness,
      setBrightness,
      volume,
      setVolume,
      playing,
      toggleAudio
    } = this.props;
    return (
      <div
        className="fixed w-96 max-w-full top-8 right-0 sm:right-2 z-50 p-2 grid grid-cols-4 grid-rows-5 gap-2 bg-white bg-opacity-40 blur rounded-2xl text-black shadow-2xl"
        ref={this.ref}
        style={{ zIndex: 100000 }}
      >
        <div className="row-span-2 col-span-2 bg-gray-200 bg-opacity-70 rounded-xl p-2 flex flex-col justify-around">
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FaWifi
              size={36}
              className={`${
                wifi ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => toggleWIFI(!wifi)}
            />
            <div className="flex flex-col">
              <span className="font-medium">Wifi</span>
              <span className="font-thin text-xs">{wifi ? "Home" : "Off"}</span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FiBluetooth
              size={36}
              className={`${
                bluetooth
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => toggleBleutooth(!bluetooth)}
            />
            <div className="flex flex-col">
              <span className="font-medium">AirDrop</span>
              <span className="font-thin text-xs">
                {airdrop ? "Contacts Only" : "Off"}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-gray-200 bg-opacity-60 blur rounded-xl p-2 flex flex-row items-center space-x-2">
          {dark ? (
            <IoMoon
              size={34}
              className="text-gray-700 bg-gray-300 bg-opacity-50 rounded-full p-2"
              onClick={() => toggleDark(false)}
            />
          ) : (
            <IoSunny
              size={34}
              className="text-gray-700 bg-gray-300 bg-opacity-50 rounded-full p-2"
              onClick={() => toggleDark(true)}
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium ml-1">
              {dark ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
        </div>

        <div className="bg-gray-200 bg-opacity-60 blur rounded-xl p-2 flex flex-col justify-center items-center text-center">
          <BsBrightnessAltHigh size={20} />
          <span className="text-xs">Keyboard Brightness</span>
        </div>

        <div
          className="bg-gray-200 bg-opacity-60 blur rounded-xl p-2 flex flex-col justify-center items-center text-center cursor-default"
          onClick={() => toggleFullScreen(!fullscreen)}
        >
          {fullscreen ? (
            <BsFullscreenExit size={16} />
          ) : (
            <BsFullscreen size={16} />
          )}
          <span className="text-xs mt-1.5">
            {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </span>
        </div>

        <div className="col-span-4 bg-gray-200 bg-opacity-60 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
          <span className="font-medium">Display</span>
          <SliderComponent
            icon={<IoSunny size={16} className="text-gray-500" />}
            value={brightness}
            setValue={setBrightness}
          />
        </div>

        <div className="col-span-4 bg-gray-200 bg-opacity-60 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
          <span className="font-medium">Sound</span>
          <SliderComponent
            icon={<IoVolumeHigh size={16} className="text-gray-500" />}
            value={volume}
            setValue={setVolume}
          />
        </div>

        <div className="col-span-4 bg-gray-200 bg-opacity-60 blur rounded-xl p-2 pr-4 flex flex-row justify-between items-center space-x-4">
          <img src={music.cover} alt="cover art" className="w-16 rounded-lg" />
          <div className="flex flex-col flex-grow justify-start">
            <span className="font-medium">{music.title}</span>
            <span className="font-extralight">{music.artist}</span>
          </div>
          {playing ? (
            <BsPauseFill onClick={() => toggleAudio(false)} size={24} />
          ) : (
            <BsPlayFill onClick={() => toggleAudio(true)} size={24} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { dark, wifi, brightness, bluetooth, airdrop, fullscreen, volume } =
    state;
  return { dark, wifi, brightness, bluetooth, airdrop, fullscreen, volume };
};

export default connect(mapStateToProps, {
  toggleDark,
  toggleWIFI,
  toggleAirdrop,
  toggleBleutooth,
  toggleFullScreen
})(ControlCenterMenu);
