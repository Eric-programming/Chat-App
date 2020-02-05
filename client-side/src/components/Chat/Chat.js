import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat-Style.css";

//Components

import InfoBar from "./InfoBar/InfoBar";
import Input from "./Input/Input";
import AllMessages from "./AllMessages/AllMessages";
import TextContainer from "./Textfield/Textfield";

let socketFrontEnd;

const Chat = ({ location, history }) => {
  const ENDPOINT = "http://localhost:5000/";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessagesArray, setAllMessagesArray] = useState([]);

  const cleanAllState = () => {
    setName("");
    setRoom("");
    setCurrentMessage("");
    setAllMessagesArray([]);
  };
  //UseEffects========================
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socketFrontEnd = io(ENDPOINT);

    socketFrontEnd.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });

    return () => {
      socketFrontEnd.emit("disconnect");
      socketFrontEnd.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socketFrontEnd.on("message", currentMessage => {
      setAllMessagesArray([...allMessagesArray, currentMessage]);
    });
  }, [allMessagesArray]);
  //UseEffects========================

  //Functions================
  const sendMessageFunc = e => {
    e.preventDefault();
    if (currentMessage) {
      socketFrontEnd.emit("sendMessage", currentMessage, () =>
        setCurrentMessage("")
      );
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <AllMessages messages={allMessagesArray} name={name} />
        <Input
          message={currentMessage}
          setMessage={setCurrentMessage}
          sendMessage={sendMessageFunc}
        />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;
