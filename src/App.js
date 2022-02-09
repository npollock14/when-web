import "./App.css";
import Header from "./components/Header";
import ArticleViewer from "./components/ArticleViewer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <ArticleViewer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
