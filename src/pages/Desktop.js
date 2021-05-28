import React, { Component, useState } from "react";
import { connect } from "react-redux";
import nightwind from "nightwind/helper";

import apps from "../configs/apps";
import wallpapers from "../configs/wallpapers";
import Menus from "../components/menus";
import Spotlight from "../components/Spotlight";
import Launchpad from "../components/Launchpad";

class Desktop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showApps: {},
      maxApps: {},
      minApps: {},
      appsZ: {},
      maxZ: 2,
      showLaunchpad: false,
      currentTitle: "macOs",
      hideDock: false,
      spotlight: false,
      spotlightBtnRef: null
    };
  }

  componentDidMount() {
    this.getAppsData();
  }

  getAppsData = () => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: app.show
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2
      };
      maxApps = {
        ...maxApps,
        [app.id]: false
      };
      minApps = {
        ...minApps,
        [app.id]: false
      };
    });

    this.setState({ showApps });
  };
  toggleLaunchpad = (target) => {
    let r = document.querySelector(`#launchpad`);
    if (target) {
      r.style.transform = "scale(1)";
      r.style.transition = "ease-in 0.2s";
    } else {
      r.style.transform = "scale(1.1)";
      r.style.transition = "ease-out 0.2s";
    }

    this.setState({ showLaunchpad: target });
  };

  render() {
    const { dark, brightness, setStateMac } = this.props;
    const { currentTitle, spotlight, showLaunchpad } = this.state;
    return (
      <div
        className="w-full h-full overflow-hidden bg-center bg-cover select-none"
        style={{
          backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
          filter: `brightness( ${brightness * 0.7 + 50}% )`
        }}
      >
        {/* 夜晚模式切换器 */}
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />

        {/* 顶部状态栏 */}
        <Menus
          title={currentTitle}
          setStateMac={setStateMac}
          toggleSpotlight={() => this.setState({ spotlight: !spotlight })}
          setSpotlightBtnRef={(value) => {
            this.setState({
              spotlightBtnRef: value
            });
          }}
        />

        {/* 搜索弹窗 */}
        {spotlight && (
          <Spotlight
            openApp={this.openApp}
            toggleLaunchpad={this.toggleLaunchpad}
            toggleSpotlight={() => this.setState({ spotlight: !spotlight })}
          />
        )}

        {/* app发射台 */}
        <Launchpad show={showLaunchpad} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.dark,
    brightness: state.brightness
  };
};

export default connect(mapStateToProps, null)(Desktop);
