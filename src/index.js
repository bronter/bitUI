import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";
import "../styles/main.styl";

let view;

document.addEventListener("DOMContentLoaded", (event) => {
  view = ReactDOM.render(<Home />, document.getElementById("react-root"));
});
