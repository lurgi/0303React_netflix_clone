import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header></Header>
      <Routes>
        <Route path={`/`} element={<Home />}>
          <Route
            path={`${process.env.PUBLIC_URL}/movie/:id`}
            element={<Home />}
          ></Route>
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/Tv`} element={<Tv />}>
          <Route
            path={`${process.env.PUBLIC_URL}/Tv/:id`}
            element={<Tv />}
          ></Route>
        </Route>
        <Route
          path={`${process.env.PUBLIC_URL}/Search/:id`}
          element={<Search />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
