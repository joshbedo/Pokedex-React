import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PokedexProvider from "./components/Provider";
import Pokedex from "./Pokedex";

import "./styles/tailwind.css";

ReactDOM.render(
  <PokedexProvider>
    <Router>
      <Pokedex />
    </Router>
  </PokedexProvider>,
  document.getElementById("root")
);
