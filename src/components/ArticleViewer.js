import React from "react";
import "./ArticleViewer.css";
import { useState, useEffect } from "react";

const ArticleViewer = ({ dateSetter }) => {
  const [articleUrl, setArticleUrl] = useState("");
  const [date, setDate] = useState(-1);

  // use effect to get a random article
  useEffect(() => {
    getRandomArticle();
  }, []);

  const getRandomArticle = async () => {
    const res = await fetch(
      "https://us-central1-testproject-551de.cloudfunctions.net/getImage"
    );
    const resJson = await res.json();
    setArticleUrl(resJson["url"]);
    setDate(resJson["date"]);
    dateSetter(resJson["date"]);
  };

  console.log(articleUrl);

  return <img className="article-viewer" src={articleUrl} alt="article"></img>;
};

export default ArticleViewer;
