import React, { Component, createRef, forwardRef } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";

import AppleMenu from "./AppleMenu";
import WifiMenu from "./WifiMenu";
import ControlCenterMenu from "./ControlCenterMenu";
import { isFullScreen } from "../../utils/screen";
import {
  setVolume,
  setBrightness,
  toggleFullScreen,
  setBattery
} from "../../redux/action";
import music from "../../configs/music";

import {
  BsBatteryCharging,
  BsBatteryFull,
  BsBatteryHalf,
  BsBattery,
  BsToggles
} from "react-icons/bs";
import { BiSearch, BiWifi, BiWifiOff } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";

const TopBarItem = forwardRef((props, ref) => {
  const hide = props.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const hover = props.forceHover
    ? "bg-white bg-opacity-30"
    : "hover:bg-white hover:bg-opacity-30 rounded";
  return (
    <div
      ref={ref}
      className={`${hide} cursor-default flex-row space-x-1 ${hover} p-1`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});
TopBarItem.displayName = "TopBarItem";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new Date(),
      showMenu: "", // apple | wifi | search | controlCenter
      playing: false
    };
    this.intervalId = null;
    this.appleBtnRef = createRef();
  }

  componentDidMount() {
    this.props.setSpotlightBtnRef(this.setSpotlightBtnRef);

    this.intervalId = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 60 * 1000);

    this.getBattery();
    this.props.toggleFullScreen(true);

    this.audio = new Audio(music.audio);
    this.audio.load();
    this.audio.volume = this.props.volume / 100;
    this.audio.addEventListener("ended", () => this.audio.play());
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.audio.removeEventListener("ended", () => this.audio.play());
  }

  getBattery = () => {
    navigator.getBattery().then((res) => {
      this.props.setBattery(res);
      res.onchargingchange = (e) => {
        this.props.setBattery(e.currentTarget);
      };
      res.onlevelchange = (e) => {
        this.props.setBattery(e.currentTarget);
      };
    });
  };
  toggleMenu = (value) => {
    this.setState({
      showMenu: value
    });
  };
  todoToggleMenu = (e, value) => {
    e.stopPropagation();
    this.toggleMenu(this.state.showMenu === value ? false : value);
  };
  toggleAudio = (target) => {
    target ? this.audio.play() : this.audio.pause();
    this.setState({ playing: target });
  };
  setVolume = (value) => {
    this.props.setVolume(value);
    this.audio.volume = value / 100;
  };

  render() {
    const {
      toggleFullScreen,
      setStateMac,
      setBrightness,
      toggleSpotlight,
      title,
      battery,
      charging,
      wifi
    } = this.props;
    const { showMenu } = this.state;
    return (
      <div
        className="nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition"
        onDoubleClick={() => toggleFullScreen(!isFullScreen())}
      >
        <div
          className="flex flex-row items-center"
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {/* 苹果logo */}
          <TopBarItem
            forceHover={showMenu === "apple"}
            onClick={(e) => this.todoToggleMenu(e, "apple")}
            ref={this.appleBtnRef}
          >
            <AiFillApple size={18} />
          </TopBarItem>
          <span className="cursor-default font-semibold m-4">{title}</span>
          {/* Apple菜单弹框 */}
          {showMenu === "apple" && (
            <AppleMenu
              setStateMac={setStateMac}
              toggleMenu={this.toggleMenu}
              btnRef={this.appleBtnRef}
            />
          )}
        </div>

        <div
          className="flex flex-row justify-end items-center space-x-2"
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {/* 电量 */}
          <TopBarItem hideOnMobile={true}>
            <span className="text-xs mt-0.5 mr-1">{battery}%</span>
            {charging ? (
              <BsBatteryCharging size={20} />
            ) : battery === 100 ? (
              <BsBatteryFull size={20} />
            ) : battery === 0 ? (
              <BsBattery size={20} />
            ) : (
              <BsBatteryHalf size={20} />
            )}
          </TopBarItem>

          {/* wifi */}
          <TopBarItem
            hideOnMobile={true}
            onClick={(e) => this.todoToggleMenu(e, "wifi")}
          >
            {wifi ? <BiWifi size={17} /> : <BiWifiOff size={17} />}
          </TopBarItem>
          {/* wifi弹框 */}
          {showMenu === "wifi" && <WifiMenu toggleMenu={this.toggleMenu} />}

          {/* 搜索 */}
          <TopBarItem onClick={toggleSpotlight}>
            <BiSearch size={17} />
          </TopBarItem>

          <TopBarItem
            hideOnMobile={true}
            onClick={(e) => this.todoToggleMenu(e, "controlCenter")}
          >
            <BsToggles size={15} />
          </TopBarItem>
          {/* 控制器弹框 */}
          {showMenu === "controlCenter" && (
            <ControlCenterMenu
              audio={this.audio}
              playing={this.state.playing}
              toggleAudio={this.toggleAudio}
              setVolume={this.setVolume}
              setBrightness={(value) => {
                setBrightness(value);
              }}
              toggleMenu={this.toggleMenu}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { volume, brightness, wifi, charging, battery } = state;
  return { volume, brightness, wifi, charging, battery };
};

export default connect(mapStateToProps, {
  toggleFullScreen,
  setBrightness,
  setBattery,
  setVolume
})(TopBar);
