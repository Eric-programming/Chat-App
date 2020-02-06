import React from "react";

import "./Input-style.css";

const Input = ({ setMessage, sendMessage, message, theme }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
    />
    <button className={`button-${theme}`} onClick={e => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
