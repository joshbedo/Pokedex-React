import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TemplateOutline } from "heroicons-react";
import { motion, AnimatePresence } from "framer-motion";

import { Pokemon, allPokemon, allByType } from "../../components/Provider";
import { PokemonCard } from "./PokemonCard";

const containerTransition = {
  animate: (i: number) => ({
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.18,
      staggerDirection: i, //we can replace it with custom number so that custom props doesn't need to declared!
    },
  }),
};

export const PokemonList = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const list: Pokemon[] = id ? await allByType(id) : await allPokemon();
      setPokemon(list);

      setLoading(false);
    })();
  }, [id]);

  if (isLoading)
    return (
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="h-screen flex items-center justify-center"
        >
          <img
            className="w-40 h-40"
            src="https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif"
            alt="Loading..."
          />
        </motion.div>
      </AnimatePresence>
    );

  return (
    <>
      <Helmet>
        <title>
          {id
            ? `${
                id.charAt(0).toUpperCase() + id.slice(1)
              } Pokemon - Pokedex App`
            : `Pokedex App - All Pokemon`}
        </title>
      </Helmet>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="flex justify-between border-b border-gray-700 px-4 py-3 sticky top-0 bg-gray-100 z-10"
        >
          <p className="text-gray-800 capitalize font-bold font-sm">
            {id || "All Pokemon"}
          </p>
          <TemplateOutline className="text-gray-400" />
        </motion.div>
      </AnimatePresence>

      {!isLoading && pokemon.length > 0 ? (
        <motion.div
          variants={containerTransition}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-2 mb-10"
        >
          {pokemon.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </motion.div>
      ) : (
        <div>No Pokemons</div>
      )}
    </>
  );
};
