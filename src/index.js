import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";

export default function App() {
  const [logon, setlogon] = useState(false);
  const [booting, setBooting] = useState(false);
  const [restart, setRestart] = useState(false);
  const [sleep, setSleep] = useState(false);

  const shutMac = (e) => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const restartMac = (e) => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const sleepMac = (e) => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setLogin(false);
    setBooting(true);
  };

  if (booting) {
    return <div />
  } else if (login) {
    <Desktop
      setLogin={setLogin}
      shutMac={shutMac}
      sleepMac={sleepMac}
      restartMac={restartMac}
    />
  } else {
    <Login
      setLogin={setLogin}
      shutMac={shutMac}
      sleepMac={sleepMac}
      restartMac={restartMac}
    />
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
