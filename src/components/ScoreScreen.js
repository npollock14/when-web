import React from "react";
import "./ScoreScreen.css";

const ScoreScreen = ({ score, resetAll }) => {
  return (
    <div className="score-screen">
      <h3>{score}</h3>
      <h4>Tap to try again</h4>
      <button className="retry-button" onClick={resetAll}/>
    </div>
  );
};

export default ScoreScreen;
