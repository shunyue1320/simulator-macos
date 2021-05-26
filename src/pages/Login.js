import React, { Component } from "react";
import { connect } from "react-redux";
import { CgSleep } from "react-icons/cg";
import { BsQuestionSquareFill } from "react-icons/bs";
import { RiShutDownLine, RiRestartLine } from "react-icons/ri";
import wallpapers from "../configs/wallpapers";
import user from "../configs/user";

class Login extends Component {
  keyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13) {
      this.props.setLogin(true);
    }
  };

  render() {
    return (
      <div
        className="w-full h-full login text-center"
        style={{
          background: `url(${
            this.props.dark ? wallpapers.night : wallpapers.day
          }) center/cover no-repeat`
        }}
        onClick={() => this.props.setLogin(true)}
      ></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.dark
  };
};

export default connect(mapStateToProps, null)(Login);
