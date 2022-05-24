import React from "react";
import "./AboutMenu.css";

const AboutMenu = ({ setAbout }) => {
  return (
    <div>
      <div className="about">
        <h1 className="main-title" id="popup-text">
          About
        </h1>
        <p>
          When Web is a date guessing game.
          <br />
          <br />
          The goal is to guess the date of the displayed article as close as
          possible down to the month and year.
          <br />
          <br />
          You are scored based on how close you are to the actual date.
          <br />
          <br />
          Articles are sourced from the Wayback Machine Internet Archive.
        </p>
        <button
          className="got-it"
          onClick={() => {
            setAbout(false);
          }}
        >
          Got it
        </button>
      </div>
      <button
        className="retry-button"
        onClick={() => {
          setAbout(false);
        }}
      ></button>
    </div>
  );
};

export default AboutMenu;
