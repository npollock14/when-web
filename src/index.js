import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const injectGA = () => {
  if (typeof window == "undefined") {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-VY5130V9SV");
  console.log("injected");
};

ReactDOM.render(
  <React.StrictMode>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-VY5130V9SV"
    />
    <script>{injectGA()}</script>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
