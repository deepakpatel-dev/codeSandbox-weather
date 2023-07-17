import "./styles.css";
import React from "react";
import Header from "./Components/Header";
import Weather from "./Components/Weather";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Weather />
      <br />
    </div>
  );
}
