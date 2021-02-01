import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarOutline, Star } from "heroicons-react";
import { PokedexContext, Pokemon, PokemonColors } from "../Provider";

type CardProps = {
  pokemon: Pokemon;
};

export const PokemonCard = ({ pokemon }: CardProps) => {
  const { appState, setFavorite } = useContext(PokedexContext);
  const [isShowingModal, setShowModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  const closeModal = () => {
    setShowModal(false);
    setNotes("");
  };

  const saveModal = () => {
    const merged = Object.assign({}, pokemon, { notes: notes });
    setFavorite(merged);
    closeModal();
  };

  // get favorite ids so we can see if a pokemon id matches
  const favoriteIds = appState.favorites.map((fav: any) => fav.id);

  return (
    <>
      <AnimatePresence>
        {isShowingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="block fixed z-20 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                onClick={closeModal}
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <StarOutline className="text-orange-400" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h1
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Add{" "}
                        <span className="font-bold capitalize">
                          {pokemon.name}
                        </span>{" "}
                        to favorites?
                      </h1>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to add <b>{pokemon.name}</b> to
                          your favorites? <i>Pokemon get jealous too.</i>
                        </p>
                      </div>
                      <div className="mt-2">
                        <textarea
                          value={notes}
                          onChange={(e: any) => setNotes(e.target.value)}
                          placeholder="Enter some notes..."
                          className="resize-none text-grey-darkest flex-1 p-4 mt-4 bg-gray-200 rounded-xl w-full b-1 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={saveModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={{
          initial: { opacity: 0, y: "120%" },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.4,
              ease: [0.5, 0.01, -0.05, 0.9],
            },
          },
        }}
        custom={1}
        className="relative bg-gray-200 rounded-2xl sm:shadow shadow-md my-2 mx-1 p-4 text-center"
        style={{ background: PokemonColors[pokemon.types[0].type.name] }}
      >
        {favoriteIds.indexOf(pokemon.id) === -1 ? (
          <button
            className="absolute inset-y-1 right-0 w-10 z-10 focus:outline-none"
            onClick={() => setShowModal(true)}
          >
            <StarOutline className="text-orange-400 hover:text-orange-800" />
          </button>
        ) : (
          <div className="absolute inset-y-1 right-0 w-10 z-10 focus:outline-none">
            <Star className="text-orange-400 hover:text-orange-800" />
          </div>
        )}
        <div className="bg-gray-400 bg-opacity-25 my-4 rounded-full text-center shadow-inner">
          <img
            width="150px"
            height="150px"
            className="w-full rendering-pixelated transform hover:-translate-y-2 hover:scale-125 transition"
            src={pokemon.image}
            alt={pokemon.name}
          />
        </div>
        <div className="my-2">
          <span className="bg-gray-400 bg-opacity-25 px-2 py-1 rounded-xl font-sm shadow-inner">
            #{pokemon.id}
          </span>
          <h1 className="capitalize font-bold my-2 tracking-wide">
            {pokemon.name}
          </h1>
          <small className="type">
            Type:{" "}
            <span className="capitalize">
              {pokemon.types.map((p: any) => p.type.name).join(", ")}
            </span>
          </small>
        </div>
      </motion.div>
    </>
  );
};
