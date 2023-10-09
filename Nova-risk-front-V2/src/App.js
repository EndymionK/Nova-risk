import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import StarsList from "./components/StarsList/StarsList";
import axios from 'axios';
import CreateStar from "./components/CreateStar/CreateStar";


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
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStars = () => {
    axios.get('http://localhost:8080/Stars')
      .then(({ data }) => {
        setStars(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteStar = (_id) => {
    axios.delete(`http://localhost:8080/Stars/${_id}`)
      .then(() => loadStars())
      .catch(error => console.log(error));
  };
    

  useEffect(() => {
    loadStars();
  }, []);

  const createStar = (values) => {
    axios.post('http://localhost:8080/Stars', values)
      .then(() => loadStars())
       
  }

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
          <Route path="/StarsList" element={<StarsList stars={stars} onDelete={deleteStar}/>} />
          <Route path="/CreateStar" element={<CreateStar createStar={createStar}/>} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
