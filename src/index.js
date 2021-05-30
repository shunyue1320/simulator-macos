import React, { useState } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import "./styles/index.css";
import "./styles/index.tailwind.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";
import Boot from "./pages/Boot";

export default function App() {
  // stateMac = 'desktop' | 'login' | 'sleep' | 'restart' | 'shutDown'
  const [stateMac, setStateMac] = useState("login");

  if (_.includes(["sleep", "restart", "shutDown"], stateMac)) {
    return <Boot stateMac={stateMac} setStateMac={setStateMac} />;
  } else if (stateMac === "desktop") {
    return <Desktop setStateMac={setStateMac} />;
  } else if (stateMac === "login") {
    return <Login setStateMac={setStateMac} />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
