import React, { Component, createRef, forwardRef } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";

import AppleMenu from "./AppleMenu";
import { enterFullScreen, isFullScreen } from "../../utils/screen";
import { toggleFullScreen } from "../../redux/action";

import { BsBatteryFull } from "react-icons/bs";
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
      showControlCenter: false,
      showWifiMenu: false,
      showAppleMenu: false,
      playing: false
    };
    this.intervalId = null;
    this.appleBtnRef = createRef();
  }

  async componentDidMount() {
    this.props.setSpotlightBtnRef(this.setSpotlightBtnRef);

    this.intervalId = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 60 * 1000);

    window.addEventListener("resize", this.resize);
    enterFullScreen();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const isFull = isFullScreen();
    this.props.toggleFullScreen(isFull);
  };
  toggleAppleMenu = (value) => {
    this.setState({
      showAppleMenu: value
    });
  };

  render() {
    return (
      <div className="nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition">
        <div className="flex flex-row items-center space-x-4">
          {/* 苹果logo */}
          <TopBarItem
            forceHover={this.state.showAppleMenu}
            onClick={() => this.toggleAppleMenu(true)}
            ref={this.appleBtnRef}
          >
            <AiFillApple size={18} />
          </TopBarItem>
          <span className="cursor-default font-semibold">
            {this.props.title}
          </span>
        </div>

        {/* Apple菜单设置 */}
        {this.state.showAppleMenu && (
          <AppleMenu
            setStateMac={this.props.setStateMac}
            toggleAppleMenu={this.toggleAppleMenu}
            btnRef={this.appleBtnRef}
          />
        )}
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
