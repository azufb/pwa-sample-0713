import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/serviceWorker.js`)
    .then((registration) => {
      console.log("Service Worker Registered");
    });
  navigator.serviceWorker.ready.then((registration) => {
    console.log("Service Worker Ready!");
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
