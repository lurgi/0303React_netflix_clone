import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/>`} element={<Home />}>
          <Route
            path={`${process.env.PUBLIC_URL}/movie/:id`}
            element={<Home />}
          ></Route>
        </Route>

        <Route path={`${process.env.PUBLIC_URL}/tv`} element={<Tv />}>
          <Route
            path={`${process.env.PUBLIC_URL}/tv/:id`}
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
