import React, { Component } from "react";
import { Rnd } from "react-rnd";

class TrafficLights extends Component {
  closeWindow = (e) => {
    e.stopPropagation();
    this.props.setShow(false);
  };

  render() {
    return (
      <div className="flex flex-row absolute left-0 space-x-2 pl-2 mt-1.5">
        <button
          className="w-3 h-3 rounded-full bg-red-500 outline-none focus:outline-none"
          onClick={this.closeWindow}
        />
        <button
          className="w-3 h-3 rounded-full bg-yellow-500 outline-none focus:outline-none"
          onClick={() => this.props.setMax(false)}
        />
        <button
          className="w-3 h-3 rounded-full bg-green-500 outline-none focus:outline-none"
          onClick={() => this.props.setMax(!this.props.max)}
        />
      </div>
    );
  }
}

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
      y: (maxH - height) / 4
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
    const round = this.props.max ? "rounded-none" : "rounded-lg";
    if (!this.props.show) {
      return <div />;
    }

    return (
      <Rnd
        size={{
          width: this.props.max ? this.state.maxW : this.state.width,
          height: this.props.max ? this.state.maxH : this.state.height
        }}
        position={{
          x: this.props.max ? 0 : this.state.x,
          y: this.props.max ? 0 : this.state.y
        }}
        onDragStop={(e, position) => {
          this.setState({
            x: position.x,
            y: position.y
          });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        disableDragging={this.props.max}
        style={{ zIndex: this.props.z }}
        onMouseDown={() => this.props.active(this.props.title)}
        className={`absolute transition-hw ${round} overflow-hidden bg-white w-full h-full shadow-md`}
      >
        <div
          className="relative h-6 text-center bg-gray-300"
          onDoubleClick={() => this.props.setMax(!this.props.max)}
        >
          <TrafficLights
            setShow={this.props.setShow}
            max={this.props.max}
            setMax={this.props.setMax}
          />
          <span className="font-semibold text-gray-700">
            {this.props.title}
          </span>
        </div>

        <div className="innner-window w-full overflow-y-hidden">
          {this.props.content}
        </div>
      </Rnd>
    );
  }
}
