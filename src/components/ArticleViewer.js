import React from "react";
import "./ArticleViewer.css";

const ArticleViewer = ({ dateSetter, articleUrl }) => {
  return <img className="article-viewer" src={articleUrl} alt="article"></img>;
};

export default ArticleViewer;
