import React, { Component, createRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";
import { toggleWIFI } from "../../redux/action";

@connect(
  ({ dark, wifi }) => ({ dark, wifi }),
  (dispatch) => bindActionCreators({ toggleWIFI }, dispatch)
)
class WifiMenu extends Component {
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
    const { toggleWIFI, wifi } = this.props;
    return (
      <div
        className="fixed h-10 w-80 max-w-full top-8 right-0 sm:right-2 px-2 py-0.5 flex gap-2 bg-gray-200 bg-opacity-90 blur rounded-lg text-black shadow-2xl"
        ref={this.ref}
        style={{ zIndex: 100000 }}
      >
        <div className="w-4/5 p-2 font-medium">Wi-Fi</div>
        <div className="w-1/5 px-3.5 py-2">
          <label className="switch-toggle">
            <input
              type="checkbox"
              checked={wifi}
              onChange={() => toggleWIFI(!wifi)}
            />
            <span className="slider-toggle"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default WifiMenu;
