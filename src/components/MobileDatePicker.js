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
  function getButtons() {
    let yearButtons = getYearButtons();
    let monthButtons = getMonthButtons();
    return monthButtons.concat(yearButtons);
  }

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
        className="year-selector button"
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

  return <div className="keypad-container">{getButtons()}</div>;
};

export default MobileDatePicker;
