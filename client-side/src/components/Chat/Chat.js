import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

const Chat = ({ location }) => {
  const ENDPOINT = "http://localhost:5000/";
  const [data, setData] = useState({
    name: "",
    room: ""
  });
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    const socket = io(ENDPOINT);

    socket.emit("join", { name, room }, () => {});
    setData({
      name,
      room
    });
    return () => {
      // console.log("Yellow");
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <div>Welcome Chat!</div>;
};

export default Chat;
