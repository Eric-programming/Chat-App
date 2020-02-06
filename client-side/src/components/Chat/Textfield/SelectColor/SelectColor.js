import React from "react";
import "./SelectColor-Style.css";

const SelectColor = ({ changeColor }) => (
  <div>
    <div
      className="select-color-blue"
      onClick={() => changeColor("blue")}
    ></div>
    <div
      className="select-color-grey"
      onClick={() => changeColor("grey")}
    ></div>
    <div
      className="select-color-gold"
      onClick={() => changeColor("gold")}
    ></div>
  </div>
);

export default SelectColor;
