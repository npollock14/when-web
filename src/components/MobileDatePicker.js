import React from "react";
import "./MobileDatePicker.css";
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

const MobileDatePicker = ({ setDate, currDate, checkDate }) => {
  //returns a list of years from 1995 to the current year to use for buttons
  function getYearButtons() {
    let currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 1995; i <= currentYear; i++) {
      years.push(
        <button
          className="year-selector button"
          key={i}
          onClick={() => {
            console.log(i);
            //set the date to the current date with new year
            let newDate = new Date(currDate);
            newDate.setFullYear(i);
            setDate(newDate);
          }}
        >
          {i.toString().substring(2, 4)}
        </button>
      );
    }
    years.push(
      <button
        className="year-selector button enter"
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
    for (let i = 0; i < 12; i++) {
      months.push(
        <button
          className="month-selector button"
          key={i}
          onClick={() => {
            console.log(monthNames[i] + " button clicked");
            //set the date to the current date with new month
            let newDate = new Date(currDate);
            newDate.setMonth(i);
            setDate(newDate);
          }}
        >
          {monthNames[i]}
        </button>
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
