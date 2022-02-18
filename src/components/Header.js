import React from "react";
import "./Header.css";
import HeaderButton from "./HeaderButton";

const Header = ({ mobile }) => {
  return (
    <div className="header-container">
      <h1 className={"main-title " + (mobile ? "mobile" : "")}>When Web</h1>
      {getButtons(mobile)}
    </div>
  );
};

function getButtons(isMobile) {
  if (isMobile) {
    return <div className="header-buttons-container"></div>;
  } else {
    return (
      <div className="header-buttons-container">
        <HeaderButton text="Home" />
        <HeaderButton text="Modes" />
        <HeaderButton text="About" />
      </div>
    );
  }
}

export default Header;
