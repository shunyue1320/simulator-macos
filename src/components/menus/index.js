import React, { Component, createRef, forwardRef } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";

import AppleMenu from "./AppleMenu";
import { enterFullScreen, isFullScreen } from "../../utils/screen";
import { toggleFullScreen } from "../../redux/action";

import {
  BsBatteryCharging,
  BsBatteryFull,
  BsBatteryHalf,
  BsBattery
} from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
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
      battery: 0,
      charging: false,
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
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getBattery = () => {
    navigator.getBattery().then((res) => {
      this.setState({
        charging: res.charging,
        battery: parseInt(res.level * 100)
      });

      res.onchargingchange = (e) => {
        this.setState({
          charging: e.currentTarget.charging
        });
      };
      res.onlevelchange = (e) => {
        this.setState({
          battery: parseInt(e.currentTarget.level * 100)
        });
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

  render() {
    return (
      <div
        className="nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition"
        onDoubleClick={() => this.props.toggleFullScreen(!isFullScreen())}
      >
        <div
          className="flex flex-row items-center space-x-4"
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {/* 苹果logo */}
          <TopBarItem
            forceHover={this.state.showMenu === "apple"}
            onClick={(e) => this.todoToggleMenu(e, "apple")}
            ref={this.appleBtnRef}
          >
            <AiFillApple size={18} />
          </TopBarItem>
          <span className="cursor-default font-semibold">
            {this.props.title}
          </span>
        </div>

        {/* Apple菜单设置 */}
        {this.state.showMenu === "apple" && (
          <AppleMenu
            setStateMac={this.props.setStateMac}
            toggleMenu={this.toggleMenu}
            btnRef={this.appleBtnRef}
          />
        )}

        <div className="flex flex-row justify-end items-center space-x-2">
          <TopBarItem hideOnMobile={true}>
            <span className="text-xs mt-0.5 mr-1">{this.state.battery}%</span>
            {this.state.charging ? (
              <BsBatteryCharging size={20} />
            ) : this.state.battery === 100 ? (
              <BsBatteryFull size={20} />
            ) : this.state.battery === 0 ? (
              <BsBattery size={20} />
            ) : (
              <BsBatteryHalf size={20} />
            )}
          </TopBarItem>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    volume: state.volume,
    brightness: state.brightness,
    wifi: state.wifi
  };
};

export default connect(mapStateToProps, {
  toggleFullScreen
})(TopBar);
