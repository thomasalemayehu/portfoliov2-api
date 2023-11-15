import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from './App'


import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
// App
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
