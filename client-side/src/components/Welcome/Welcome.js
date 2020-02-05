import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Welcome-style.css";
const Welcome = () => {
  const [data, setData] = useState({
    name: "",
    room: ""
  });
  const onChangeFunc = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };
  const { name, room } = data;
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chat App</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            name="name"
            type="text"
            value={name}
            onChange={event => onChangeFunc(event)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            name="room"
            value={room}
            onChange={event => onChangeFunc(event)}
          />
        </div>
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Let's Go!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
