import { useState } from "react";

import Search from "./components/search";
import Weather from "./components/weather";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
