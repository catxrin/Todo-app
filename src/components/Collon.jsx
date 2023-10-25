import { Component } from "react";

export default class Collon extends Component {
  render() {
    return (
      <div
        className={`overflow-y-auto rounded-lg w-[250px] sm:w-[470px] shadow-md shadow-[#cccccccc] h-[400px] py-2 px-3 flex flex-col ${this.props.color}`}
      >
        <p className="text-center mb-[7px] font-medium">{this.props.label}</p>
        <hr />
        <div className="flex mt-4 flex-col gap-3">{this.props.data}</div>
      </div>
    );
  }
}
