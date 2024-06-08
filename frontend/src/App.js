import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Contests from "./components/contests";
import Login from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/contests" element={<Contests />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
