import "./App.css";
import Header from "./components/Header";
import ArticleViewer from "./components/ArticleViewer";
import Footer from "./components/Footer";
import DatePicker from "./components/DatePicker";
import { useState } from "react";

function App() {
  const [date, setDate] = useState(-1);

  return (
    <div className="App">
      <Header date={date} />
      <div className="main-container">
        <ArticleViewer dateSetter={setDate} />
        <DatePicker />
      </div>
      <Footer />
    </div>
  );
}

export default App;
