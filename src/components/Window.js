import React, { Component } from "react";
import { Rnd } from "react-rnd";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus, FiMaximize2, FiMinimize2 } from "react-icons/fi";

const TrafficLights = ({ id, close, max, setMax, setMin }) => {
  const closeWindow = (e) => {
    e.stopPropagation();
    close(id);
  };
  return (
    <div className="traffic_lights flex flex-row absolute left-0 space-x-2 pl-2 mt-1.5">
      <button
        className="w-3 h-3 rounded-full bg-red-500 outline-none focus:outline-none inline-flex justify-center items-center"
        onClick={closeWindow}
        onTouchEnd={closeWindow}
      >
        <IoCloseOutline size={11} />
      </button>

      <button
        className={`w-3 h-3 rounded-full ${
          max ? "bg-gray-400" : "bg-yellow-500"
        } outline-none focus:outline-none inline-flex justify-center items-center`}
        onClick={() => setMin(id)}
        onTouchEnd={() => setMin(id)}
        disabled={max ? 1 : 0}
      >
        <FiMinus size={10} className={max ? "invisible" : ""} />
      </button>

      <button
        className="w-3 h-3 rounded-full bg-green-500 outline-none focus:outline-none  inline-flex justify-center items-center"
        onClick={() => setMax(id)}
        onTouchEnd={() => setMax(id)}
      >
        {max ? <FiMinimize2 size={10} /> : <FiMaximize2 size={10} />}
      </button>
    </div>
  );
};

export default class Window extends Component {
  constructor(props) {
    super(props);
    const maxW = document.body.offsetWidth;
    const maxH = document.body.offsetHeight;
    const width = Math.min(maxW, props.width ?? "800");
    const height = Math.min(maxH, props.height ?? "500");
    this.state = {
      maxW,
      maxH,
      width,
      height,
      x: (maxW - width) / 2,
      y: (maxH - height) / 6
    };
    this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  omponentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const maxW = document.body.offsetWidth;
    const maxH = document.body.offsetHeight;
    const width = Math.min(maxW, this.state.width);
    const height = Math.min(maxH, this.state.height);

    this.setState({
      maxW: maxW,
      maxH: maxH,
      width: width,
      height: height
    });
  };

  render() {
    const minMarginY = 24;
    const minMarginX = 100;
    const round = this.props.max ? "rounded-none" : "rounded-lg";
    const minimized = this.props.min
      ? "opacity-0 invisible transition-opacity duration-300"
      : "";
    const border = this.props.max
      ? ""
      : "border border-gray-500 border-opacity-30";
    const width = this.props.max ? this.state.maxW : this.state.width;
    const height = this.props.max ? this.state.maxH : this.state.height;
    const minWidth = this.props.minWidth ?? 300;
    const minHeight = this.props.minHeight ?? 300;
    const position = {
      x: this.props.max
        ? 0
        : Math.min(
            window.innerWidth - minMarginX,
            Math.max(-this.state.width + minMarginX, this.state.x)
          ),
      y: this.props.max
        ? 0
        : Math.min(
            window.innerHeight - minMarginY,
            Math.max(minMarginY, this.state.y)
          )
    };

    let children = React.cloneElement(this.props.children, { width });

    return (
      <Rnd
        id={`window-${this.props.id}`}
        size={{ width, height }}
        position={position}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        onMouseDown={() => this.props.focus(this.props.id)}
        minWidth={minWidth}
        minHeight={minHeight}
        disableDragging={this.props.max}
        style={{ zIndex: this.props.z }}
        dragHandleClassName="window-drag"
        className={`absolute ${round} overflow-hidden bg-transparent w-full h-full ${border} shadow-md ${minimized}`}
      >
        <div
          className="window-drag relative h-6 text-center bg-gray-200"
          onDoubleClick={() => this.props.setMax(this.props.id)}
        >
          <TrafficLights
            id={this.props.id}
            close={this.props.close}
            max={this.props.max}
            setMax={this.props.setMax}
            setMin={this.props.setMin}
          />
          <span className="font-semibold text-gray-700">
            {this.props.title}
          </span>
        </div>

        <div className="innner-window w-full overflow-y-hidden">{children}</div>
      </Rnd>
    );
  }
}
