import React, { Component, useState } from "react";
import { connect } from "react-redux";
import nightwind from "nightwind/helper";

import apps from "../configs/apps";
import wallpapers from "../configs/wallpapers";

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
      currentTitle: "Finder",
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

  render() {
    return (
      <div
        className="w-full h-full overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            this.props.dark ? wallpapers.night : wallpapers.day
          })`,
          filter: `brightness( ${this.props.brightness * 0.7 + 50}% )`
        }}
      >
        {/* Dark Model Toggler */}
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
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
