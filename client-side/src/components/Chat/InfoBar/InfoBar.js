import React from "react";

import "./InfoBar-style.css";

const InfoBar = ({ room, theme }) => (
  <div className={`infobar-${theme}`}>
    <div className="leftInnerContainer">
      <img
        className="onlineIcon"
        src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"
        alt="online icon"
      />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img
          src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png"
          alt="close icon"
        />
      </a>
    </div>
  </div>
);

export default InfoBar;
