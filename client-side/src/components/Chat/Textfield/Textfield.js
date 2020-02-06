import React from "react";
import "./TextContainer-style.css";
import SelectColor from "./SelectColor/SelectColor";

const TextContainer = ({ users, name, changeColorFunc }) => (
  <div className="textContainer">
    <div>
      <h1>Current Account: {name}</h1>
      <h2>You can change the color:</h2>
      <SelectColor changeColor={changeColorFunc} />
    </div>
    {users ? (
      <div>
        <h1>Online:</h1>
        <div className="activeContainer">
          <h3>
            {users.map(({ name, isTyping }) => (
              <div key={name} className="activeItem">
                <img
                  alt="Online Icon"
                  src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"
                />
                {name} {isTyping ? "is typing..." : null}
              </div>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
