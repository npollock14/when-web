import React from "react";
import "./Header.css";
import HeaderButton from "./HeaderButton";

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="main-title">When Web</h1>
      <HeaderButton text="Home" />
      <HeaderButton text="Modes" />
      <HeaderButton text="About" />
    </div>
  );
};

export default Header;
