import "./App.css";
import Header from "./components/Header";
import ArticleViewer from "./components/ArticleViewer";
import Footer from "./components/Footer";
import DatePicker from "./components/DatePicker";
import MobileDatePicker from "./components/MobileDatePicker";
import { useState, useEffect } from "react";
import ScoreScreen from "./components/ScoreScreen";
import ReactGA from "react-ga";
ReactGA.initialize(
  [
    {
      trackingId: "UA-221035040-1",
    },
  ],
  { debug: false }
);

function App() {
  const [date, setDate] = useState(new Date());
  const [guessDate, setGuessDate] = useState(new Date());
  const [articleUrl, setArticleUrl] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState("-1");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    getRandomArticle();
  }, []);

  //gets a random article from the my api
  const getRandomArticle = async () => {
    setLoaded(false);
    const res = await fetch(
      "https://us-central1-testproject-551de.cloudfunctions.net/getImage"
    );
    const resJson = await res.json();
    setArticleUrl(resJson["url"]);
    // setArticleUrl(
    //   "https://firebasestorage.googleapis.com/v0/b/testproject-551de.appspot.com/o/Snapshots%2F20150103_nytimesmobile.png?alt=media&token=bed38c61-20aa-42af-9259-774ee5c1375a"
    // );
    let date = resJson["date"];

    //convert a date in YYYYMMDD format to a date object and set it as the date
    let newDate = new Date(
      date.substring(0, 4),
      date.substring(4, 6) - 1,
      date.substring(6, 8)
    );
    setDate(newDate);
    setLoaded(true);
    console.log("got an article");
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function checkDate() {
    //get how many months difference there is between the current date and the date of the article
    let monthsOff =
      (date.getFullYear() - guessDate.getFullYear()) * 12 -
      guessDate.getMonth() +
      date.getMonth();

    console.log(monthsOff);

    ReactGA.event({
      category: "User",
      action: "Guessed Date",
      //value should be the date with the format Month Year
      value: monthsOff,
    });

    setScore(genScoreString(monthsOff));
    setGameOver(true);
  }

  function genScoreString(monthsOff) {
    if (monthsOff === 0) return "Perfect!";
    let years = Math.abs(Math.floor(monthsOff / 12));
    let months = Math.abs(monthsOff % 12);

    let scoreString = "";
    //create a score string x year(s) and x month(s) early/late
    if (years !== 0) {
      scoreString += years + " year" + (years > 1 ? "s" : "") + " ";
    }
    if (months !== 0) {
      scoreString += months + " month" + (months > 1 ? "s" : "") + " ";
    }
    if (monthsOff < 0) {
      scoreString += "late";
    } else {
      scoreString += "early";
    }
    return scoreString;
  }

  function resetAll() {
    getRandomArticle();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setGameOver(false);
  }

  const isMobile = width <= 600;

  return (
    <div className="App">
      <Header mobile={isMobile} />
      <div className="main-container">
        {loaded ? (
          <ArticleViewer dateSetter={setDate} articleUrl={articleUrl} />
        ) : (
          <h1>Loading...</h1>
        )}
        <MobileDatePicker
          setDate={setGuessDate}
          guessDate={guessDate}
          checkDate={checkDate}
        />
        {gameOver ? (
          <ScoreScreen
            score={score}
            currDate={guessDate}
            actualDate={date}
            resetAll={resetAll}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
