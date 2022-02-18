import "./App.css";
import Header from "./components/Header";
import ArticleViewer from "./components/ArticleViewer";
import Footer from "./components/Footer";
import DatePicker from "./components/DatePicker";
import MobileDatePicker from "./components/MobileDatePicker";
import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import ScoreScreen from "./components/ScoreScreen";
const TRACKING_ID = "G-9C69JCJHW1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const [date, setDate] = useState(-1);
  const [currDate, setCurrDate] = useState(new Date());
  const [articleUrl, setArticleUrl] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState("-1");

  useEffect(() => {
    getRandomArticle();
  }, []);

  const getRandomArticle = async () => {
    // const res = await fetch(
    //   "https://us-central1-testproject-551de.cloudfunctions.net/getImage"
    // );
    // const resJson = await res.json();
    // setArticleUrl(resJson["url"]);
    // setDate(resJson["date"]);
    // setDate(resJson["date"]);
    setArticleUrl(
      "https://firebasestorage.googleapis.com/v0/b/testproject-551de.appspot.com/o/Snapshots%2F20150103_nytimesmobile.png?alt=media&token=bed38c61-20aa-42af-9259-774ee5c1375a"
    );
    let date = "20150103";
    //convert a date in YYYYMMDD format to a date object and set it as the date
    let newDate = new Date(
      date.substring(0, 4),
      date.substring(4, 6) - 1,
      date.substring(6, 8)
    );
    setDate(newDate);
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
    //if the difference is less than a month, log "You Won"
    let scoreString = "";
    if (diffDays < 31) {
      console.log("You Won");
      scoreString = "You Won";
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

  const isMobile = width <= 500;

  return (
    <div className="App">
      <Header mobile={isMobile} />
      <div className="main-container">
        <ArticleViewer dateSetter={setDate} articleUrl={articleUrl} />
        <MobileDatePicker
          setDate={setCurrDate}
          currDate={currDate}
          checkDate={checkDate}
        />
        {gameOver ? <ScoreScreen score={score} /> : null}
      </div>
      <Footer />
    </div>
  );
}

export default App;
