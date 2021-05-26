import React, { Component } from "react";
import { connect } from "react-redux";
import { CgSleep } from "react-icons/cg";
import { BsFillLockFill, BsUnlockFill } from "react-icons/bs";
import { RiMoonFill, RiShutDownLine, RiRestartLine } from "react-icons/ri";
import wallpapers from "../configs/wallpapers";
import user from "../configs/user";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      password: null,
      correctPassword: 123
    };
  }

  keyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13) {
      if (this.state.password == 123) {
        this.props.setLogin(true);
      } else {
        this.setState({ error: true });
      }
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
      >
        <div className="inline-block w-auto relative top-1/2 -mt-40">
          {/* 用户头像 */}
          <img
            className="rounded-full w-24 h-24 my-0 mx-auto"
            src={user.avatar}
            alt="img"
          />
          <div className="nightwind-prevent font-semibold text-xl mt-2 text-white">
            {user.name}
          </div>
          {/* 密码输入框 */}
          <div className="nightwind-prevent mx-auto grid grid-cols-5 w-44 h-8 mt-4 rounded-md bg-gray-300 blur bg-opacity-50">
            <input
              className="nightwind-prevent text-sm col-start-1 col-span-4 outline-none focus:outline-none bg-transparent px-2 text-white"
              type="password"
              value={this.state.password}
              placeholder={`Password is ${this.state.correctPassword}`}
              onKeyPress={this.keyPress}
              onInput={(e) =>
                this.setState({ password: e.target.value, error: false })
              }
            />
            <div className="col-start-5 col-span-1 flex justify-center items-center">
              {this.state.password == this.state.correctPassword ? (
                <BsUnlockFill color="white" />
              ) : (
                <BsFillLockFill color="white" />
              )}
            </div>
          </div>
          <div
            className={`nightwind-prevent text-sm mt-2 ${
              this.state.error
                ? "text-red-500 bg-white rounded-md"
                : "text-gray-200"
            }`}
          >
            {this.state.error ? "Password error!" : "Enter password login"}
          </div>
        </div>

        {/* 电源按钮 */}
        <div className="nightwind-prevent-block text-sm fixed bottom-16 left-0 right-0 mx-auto flex flex-row space-x-4 w-max">
          <div
            className="flex flex-col items-center text-white w-24"
            onClick={this.props.sleepMac}
          >
            <div className="h-10 w-10 rounded-full inline-flex justify-center items-center">
              <RiMoonFill size={40} />
            </div>
            <span>Sleep</span>
          </div>
          <div
            className="flex flex-col items-center text-white w-24"
            onClick={this.props.restartMac}
          >
            <div className="h-10 w-10 rounded-full inline-flex justify-center items-center">
              <RiRestartLine size={36} />
            </div>
            <span>Restart</span>
          </div>
          <div
            className="flex flex-col items-center text-white w-24"
            onClick={this.props.shutMac}
          >
            <div className="h-10 w-10 rounded-full inline-flex justify-center items-center">
              <RiShutDownLine size={36} />
            </div>
            <span>Shut Down</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.dark
  };
};

export default connect(mapStateToProps, null)(Login);
