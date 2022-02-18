import React from "react";
import "./DatePicker.css";
import { useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePicker = () => {
  const [date, setDate] = useState([
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [mode, setMode] = useState(0);

  const getYears = () => {
    let years = [];
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    return years;
  };

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function getDays(month, year) {
    let days = [];
    for (let i = 1; i <= daysInMonth(month, year); i++) {
      days.push(i);
    }
    return days;
  }

  function getButtons() {
    let buttons = [];
    switch (mode) {
      case 0:
        buttons = getYears().map((year, index) => {
          return (
            <button
              className="date-selector"
              key={index}
              onClick={() => {
                setYear(year);
                setMode(1);
              }}
            >
              {year}
            </button>
          );
        });
        break;
      case 1:
        buttons = monthNames.map((month, index) => {
          return (
            <button
              className="date-selector"
              key={index}
              onClick={() => {
                setMonth(index);
                setMode(2);
              }}
            >
              {month}
            </button>
          );
        });
        break;
      case 2:
        buttons = getDays(month, year).map((day, index) => {
          return (
            <button
              className="date-selector"
              key={index}
              onClick={() => {
                setDay(day);
              }}
            >
              {day}
            </button>
          );
        });
        break;
      default:
        break;
    }
    return buttons;
  }

  return (
    <div className="picker-container">
      <div className="picker-header">
        <h3 className="picker-header-content">
          Selected: {month + 1}/{day}/{year}
        </h3>
        <div className="mode-selector">
          <button
            className="mode-button"
            onClick={() => {
              setMode(0);
            }}
          >
            Year
          </button>
          <button
            className="mode-button"
            onClick={() => {
              setMode(1);
            }}
          >
            Month
          </button>
          <button
            className="mode-button"
            onClick={() => {
              setMode(2);
            }}
          >
            Day
          </button>
        </div>
      </div>
      <div className="date-picker">{getButtons()}</div>
      <button className="guess-btn">Guess</button>
    </div>
  );
};

export default DatePicker;

//idea here is to first select year, then month, then day
// will use a vertical timeline to select the date
// 3 total clicks - year, month, day

//or could have 3 tabs for Y M D - cobine these features into one!
