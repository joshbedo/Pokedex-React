import React from "react";
import { Switch, Route } from "react-router-dom";

import { NavList } from "./components/NavList";
import { PokemonList } from "./components/pokemon/PokemonList";
import { FavList } from "./components/FavList";

function Pokedex() {
  return (
    <div className="App">
      <div className="md:container md:mx-auto h-screen">
        <div className="flex flex-row justify-center">
          <NavList />

          <div className="overflow-y-scroll w-full sm:w-600 h-screen bg-gray-300">
            <Switch>
              <Route exact path="/" component={PokemonList} />
              <Route path="/type/:id" component={PokemonList} />
            </Switch>
          </div>

          <div className="w-350 lg:w-350 h-screen">
            <div className="flex flex-col fixed overflow-y-auto w-290 lg:w-350 h-screen">
              <FavList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
