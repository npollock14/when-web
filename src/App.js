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
  const [currDate, setCurrDate] = useState(new Date());
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
    //get the time between dates in years and months
    let timeDiff = Math.abs(date.getTime() - currDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //use diffDays to determine how many years and months
    let years = Math.floor(diffDays / 365);
    let months = Math.floor((diffDays % 365) / 30);
    let monthsOff = Math.floor((diffDays / 365) * 12);

    ReactGA.event({
      category: "User",
      action: "Guessed Date",
      //value should be the date with the format Month Year
      value: monthsOff,
    });

    //if the difference is less than a month, log "You Won"
    let scoreString = "";
    if (diffDays < 31) {
      console.log("You Won");
      scoreString = "Perfect!";
    } else {
      console.log(
        "You were " +
          (years > 0 ? years + " years " : "") +
          months +
          " months off"
      );
      scoreString =
        (years > 0 ? years + " years " : "") + months + " months off";
    }
    setScore(scoreString);
    setGameOver(true);
  }

  function resetAll() {
    getRandomArticle();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
          setDate={setCurrDate}
          currDate={currDate}
          checkDate={checkDate}
        />
        {gameOver ? (
          <ScoreScreen
            score={score}
            currDate={currDate}
            actualDate={date}
            resetAll={resetAll}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
