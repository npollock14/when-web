import React from "react";
import "./MobileDatePicker.css";
import "./DateButton.css";
import DateButton from "./DateButton";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MobileDatePicker = ({ setDate, guessDate, checkDate }) => {
  //returns a list of years from 1995 to the current year to use for buttons
  function getYearButtons() {
    function yearSetter(index) {
      let newDate = new Date(guessDate);
      newDate.setFullYear(index);
      setDate(newDate);
    }

    let currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 1995; i <= currentYear; i++) {
      years.push(
        <DateButton
          key={i}
          text={i.toString().substring(2, 4)}
          index={i}
          setDate={yearSetter}
          styleArg={guessDate.getFullYear() === i ? " selected" : ""}
        />
      );
    }
    years.push(
      <button
        className="date-selector button enter"
        key={"enterBtn"}
        onClick={() => {
          console.log("Enter button clicked");
          checkDate();
        }}
      >
        {"Enter"}
      </button>
    );
    return years;
  }

  function getMonthButtons() {
    let months = [];

    function monthSetter(index) {
      let newDate = new Date(guessDate);
      newDate.setMonth(index);
      setDate(newDate);
    }

    for (let i = 0; i < 12; i++) {
      months.push(
        <DateButton
          key={i}
          text={monthNames[i]}
          index={i}
          setDate={monthSetter}
          styleArg={"month" + (guessDate.getMonth() === i ? " selected" : "")}
        />
      );
    }
    return months;
  }

  return (
    <div className="keypad-container">
      <div className="month-button-container">{getMonthButtons()}</div>
      <div className="year-button-container">{getYearButtons()}</div>
    </div>
  );
};

export default MobileDatePicker;
