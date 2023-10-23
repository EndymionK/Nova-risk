import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import StarsList from "./components/StarsList/StarsList";
import CreateStar from "./components/CreateStar/CreateStar";
import StarDetails from "./components/StarDetails/StarDetails";
import NovaRisk from "./components/NovaRisk/NovaRisk";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/StarsList" element={<StarsList/>} />
          <Route path="/CreateStar" element={<CreateStar/>} />
          <Route path="/star/:id" element={<StarDetails/>} />
          <Route path="/NovaRisk" element={<NovaRisk/>} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
