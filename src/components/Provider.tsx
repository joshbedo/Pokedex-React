import React, { createContext, useState, ReactNode } from "react";

type Context = {
  appState: {
    currentUser: {
      firstName: string;
      lastName: string;
    };
    loggedIn: boolean;
    favorites: Pokemon[];
  };
  setFavorite(pokemon: Pokemon): void;
  removeFavorite(pokemon: Pokemon): void;
};

const initialState: Context = {
  appState: {
    currentUser: { firstName: "Ash", lastName: "Ketchum" },
    loggedIn: true,
    favorites: [
      {
        id: 25,
        name: "pikachu",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        notes: "BFF ❤️",
        types: [],
      },
    ],
  },
  setFavorite: (pokemon: Pokemon) => {},
  removeFavorite: (pokemon: Pokemon) => {},
};

export const PokedexContext = createContext<Context>(initialState);

function PokedexProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState(initialState.appState);

  const setFavorite = (pokemon: Pokemon) => {
    const filter = appState.favorites.filter(
      (fav: Pokemon) => fav.id !== pokemon.id
    );
    setAppState({ ...appState, favorites: [...filter, pokemon] });
  };

  const removeFavorite = (pokemon: Pokemon) => {
    const filter = appState.favorites.filter(
      (fav: Pokemon) => pokemon.id !== fav.id
    );
    setAppState({ ...appState, favorites: filter });
  };

  return (
    <PokedexContext.Provider
      value={{
        appState,
        setFavorite,
        removeFavorite,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}

/**
 * API Calls - model schema types, api calls, etc.
 */
export type Pokemon = {
  id: string | number;
  name: string;
  image: string;
  types: any[];
  notes?: string;
};

export type PokemonType = {
  id: string | number;
  name: string;
};

export const allPokemon = async () => {
  const initial = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const initialJson = await initial.json();

  const detailsData = initialJson.results.map(async (i: any) => {
    const preFetchData = await fetch(i.url);
    return preFetchData.json();
  });

  const payload = (await Promise.all(detailsData)).map((data: any) => ({
    id: data.id,
    name: data.name,
    image: data.sprites["front_default"],
    types: data.types,
  }));

  return payload;
};

export const allByType = async (id: string) => {
  const initial = await fetch(`https://pokeapi.co/api/v2/type/${id}`);
  const initialJson = await initial.json();

  const detailsData = initialJson.pokemon.map(async (i: any) => {
    const preFetchData = await fetch(i.pokemon.url);
    return preFetchData.json();
  });

  const payload = (await Promise.all(detailsData)).map((data: any) => ({
    id: data.id,
    name: data.name,
    image: data.sprites["front_default"],
    types: data.types,
  }));

  return payload;
};

export const allTypes = async () => {
  const initial = await fetch("https://pokeapi.co/api/v2/type");
  const data = await initial.json();
  const payload: any = {};

  data.results.forEach((type: PokemonType, index: number) => {
    payload[index + 1] = {
      id: index + 1,
      name: type.name,
    };
  });

  return payload;
};

export const PokemonColors: any = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ghost: "#cdc0d6",
};

export default PokedexProvider;
