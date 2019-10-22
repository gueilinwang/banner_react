import React from "react";
import ReactDOM from "react-dom";
import Banner from "./BannerComponent/Banner";
import "./BannerComponent/Banner.css";

let setting = {
  openAtStart: true,
  autoToggle: false,
  button: {
    openText: "展開",
    closeText: "收合",
    class: "button"
  },
  className: {
    opened: "turnedOn",
    opening: "turningOn",
    closed: "turnedOff",
    closing: "turningOff"
  },
  transition: false
};
window.banner = ReactDOM.render(
  <Banner setting={setting} />,
  document.getElementById("root")
);
