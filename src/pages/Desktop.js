import React, { Component } from "react";
import { connect } from "react-redux";
import nightwind from "nightwind/helper";

import apps from "../configs/apps";
import wallpapers from "../configs/wallpapers";
import Menus from "../components/menus";
import Spotlight from "../components/Spotlight";
import Launchpad from "../components/Launchpad";
import Dock from "../components/dock/Dock";
import Window from "../components/Window";

@connect(({ dark, brightness }) => ({ dark, brightness }))
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
  openApp = (id) => {
    // add it to the shown app list
    let showApps = this.state.showApps;
    showApps[id] = true;

    // move to the top (use a maximum z-index)
    let appsZ = this.state.appsZ;
    let maxZ = this.state.maxZ + 1;
    appsZ[id] = maxZ;

    this.setState({
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ,
      currentTitle: apps.find((app) => {
        return app.id === id;
      }).title
    });

    let minApps = this.state.minApps;
    // if the app has already been shown but minimized
    if (minApps[id]) {
      // move to window's last position
      let r = document.querySelector(`#window-${id}`);
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      let timer = setTimeout(() => {
        clearTimeout(timer);
        r.style.transition = "none";
      }, 300);
      // remove it from the minimized app list
      minApps[id] = false;
      this.setState({ minApps });
    }
  };
  closeApp = (id) => {
    let showApps = this.state.showApps;
    showApps[id] = false;
    this.setState({
      showApps: showApps,
      hideDock: false
    });
  };
  setAppMax = (id, target) => {
    let maxApps = this.state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    this.setState({
      maxApps: maxApps,
      hideDock: target
    });
  };

  setAppMin = (id, target) => {
    let minApps = this.state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    this.setState({
      minApps: minApps
    });
  };
  minimizeApp = (id) => {
    this.setWinowsPosition(id);

    // get the corrosponding dock icon's position
    var r = document.querySelector(`#dock-${id}`);
    const dockAppRect = r.getBoundingClientRect();

    r = document.querySelector(`#window-${id}`);
    const appRect = r.getBoundingClientRect();
    const posY =
      document.body.offsetHeight -
      appRect.y.toFixed(1) -
      (r.offsetHeight / 2).toFixed(1);
    const posX = dockAppRect.x.toFixed(1) - (r.offsetWidth / 2).toFixed(1) + 25;
    // translate the window to that position
    r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`;
    r.style.transition = "ease-out 0.3s";
    // add it to the minimized app list
    this.setAppMin(id, true);
  };
  setWinowsPosition = (id) => {
    let r = document.querySelector(`#window-${id}`);
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      rect.x.toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      rect.y.toFixed(1).toString() + "px"
    );
  };
  renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && this.state.showApps[app.id]) {
        const props = {
          title: app.title,
          id: app.id,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          z: this.state.appsZ[app.id],
          max: this.state.maxApps[app.id],
          min: this.state.minApps[app.id],
          close: this.closeApp,
          setMax: this.setAppMax,
          setMin: this.minimizeApp,
          focus: this.openApp
        };

        return (
          <Window key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </Window>
        );
      } else {
        return <div key={`desktop-app-${app.id}`} />;
      }
    });
  };

  render() {
    const { dark, brightness, setStateMac } = this.props;
    const { currentTitle, spotlight, showLaunchpad, maxZ } = this.state;
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
          z={maxZ}
          setMaxZ={() => this.setState({ maxZ: maxZ + 1 })}
        />

        {/* 打开的应用窗口 */}
        {this.renderAppWindows()}

        {/* 全局搜索输入框 */}
        {spotlight && (
          <Spotlight
            openApp={this.openApp}
            toggleLaunchpad={this.toggleLaunchpad}
            toggleSpotlight={() => this.setState({ spotlight: !spotlight })}
          />
        )}

        {/* 小火箭app搜索弹窗 */}
        <Launchpad
          show={showLaunchpad}
          toggleLaunchpad={this.toggleLaunchpad}
        />

        {/* 底部app导航栏 */}
        <Dock
          open={this.openApp}
          showApps={this.state.showApps}
          showLaunchpad={this.state.showLaunchpad}
          toggleLaunchpad={this.toggleLaunchpad}
          hide={this.state.hideDock}
        />
      </div>
    );
  }
}

export default Desktop;
