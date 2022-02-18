import React from "react";
import "./DateButton.css";

const DateButton = ({ text, index, setDate, styleArg="" }) => {
  return (
  <button
          className={"date-selector button " + styleArg}
          key={index}
          onClick={() => {
            console.log(index);
            //set the date to the current date with new year
            setDate(index);
          }}
        >
          {text}
        </button>
  );
};

export default DateButton;
