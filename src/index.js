import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";

import Desktop from "./components/Desktop";
import Login from "./components/Login";

export default function App() {
  const [logon, setlogon] = useState(false);
  return logon ? <Desktop /> : <Login setlogon={setlogon} />;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
