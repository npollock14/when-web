import React from "react";
import "./Header.css";

const Header = ({ mobile, setAbout, about }) => {
  return (
    <div className="header-container">
      <h1 className={"main-title " + (mobile ? "mobile" : "")}>When Web</h1>
      <h3 className="betaText">Beta</h3>
      {getButtons(mobile, setAbout, about)}
    </div>
  );
};

function getButtons(isMobile, setAbout, about) {
  if (isMobile) {
    return <div className="header-buttons-container"></div>;
  } else {
    return (
      <div className="header-buttons-container">
        <button
          className="header-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </button>
        <button
          className="header-button"
          onClick={() => {
            setAbout(!about);
          }}
        >
          About
        </button>
      </div>
    );
  }
}

export default Header;
