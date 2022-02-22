import React from "react";
import "./ScoreScreen.css";

const ScoreScreen = ({ score, currDate, actualDate, resetAll }) => {
  //convert the actual date to a string
  function convertDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="score-screen">
      <p>Guess:</p>
      <h3 className="score">{convertDate(currDate)}</h3>
      <p>Actual:</p>
      <h3 className="score">{convertDate(actualDate)}</h3>
      <h3>{score}</h3>
      <p className="try-again">Tap to try again</p>
      <button className="retry-button" onClick={resetAll} />
    </div>
  );
};

export default ScoreScreen;
