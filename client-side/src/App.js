import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Chat from "./components/Chat/Chat";
const App = () => (
  <Router>
    <Route path="/" exact component={Welcome} />
    <Route path="/chat" exact component={Chat} />
  </Router>
);

export default App;
