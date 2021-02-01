import React, { useContext } from "react";
import { StarOutline } from "heroicons-react";
import { motion, AnimatePresence } from "framer-motion";

import { PokedexContext, Pokemon } from "./Provider";

const variants = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    backgroundColor: "#FF2000",
    transition: {
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

export const FavList = () => {
  const { appState, removeFavorite } = useContext(PokedexContext);

  if (appState.favorites.length === 0) {
    return (
      <div className="bg-gray-300 m-2 hidden lg:block">
        <h1 className="flex justify-between text-dark bg-gray-200 text-md font-bold p-3 border-b border-dim-200">
          Your Favorites
          <StarOutline className="text-gray-400" />
        </h1>
        <div className="text-black-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-gray-200 cursor-pointer transition duration-350 ease-in-out">
          <p>No Favorites :(</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 m-2 hidden lg:block">
      <h1 className="flex justify-between text-dark bg-gray-200 text-md font-bold p-3 border-b border-dim-200">
        Your Favorites
        <StarOutline className="text-gray-400" />
      </h1>
      <AnimatePresence>
        {appState.favorites
          .sort((a: any, b: any) => a.id - b.id)
          .map((pokemon: Pokemon) => (
            <motion.div
              key={pokemon.id}
              initial={variants.hidden}
              animate={variants.show}
              exit={variants.exit}
              className="text-black-400 bg-gray-300 text-sm font-normal p-3 border-b border-dim-200 hover:bg-gray-200 cursor-pointer transition duration-350 ease-in-out"
            >
              <div className="flex flex-row justify-between p-2">
                <div className="flex flex-row">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                  <div className="flex text-left flex-col ml-2">
                    <h1 className="capitalize text-dark font-bold text-sm">
                      {pokemon.name}
                    </h1>
                    <p className="text-gray-500 text-sm">{pokemon.notes}</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center h-full text-white">
                    <button
                      onClick={() => removeFavorite(pokemon)}
                      className="text-xs font-bold text-red-600 px-4 py-1 rounded-full border-2 border-red-600 hover:border-red-700 hover:text-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
