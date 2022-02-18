import React from "react";
import "./ScoreScreen.css";

const ScoreScreen = ({ score }) => {
  return (
    <div className="score-screen">
      <h3>{score}</h3>
    </div>
  );
};

export default ScoreScreen;
