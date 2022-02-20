import React from "react";
import "./DateButton.css";
import { useState } from "react";

const DateButton = ({ text, index, setDate, styleArg = "" }) => {
  const [selected, setSelected] = useState(false);

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
