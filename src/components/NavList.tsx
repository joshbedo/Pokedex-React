import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FilterOutline, Template } from "heroicons-react";

import { PokemonType, allTypes } from "./Provider";

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
};

// keep track of initial state of list before filtered
var list: PokemonType[] = [];

export const NavList = () => {
  const history = useHistory();

  const [isMobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isFavOpen, setFavOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async () => {
      list = await allTypes();
      setTypes(list);
    })();
  }, []);

  const filterList = (e: any) => {
    const filtered = Object.keys(list)
      .filter((key: any) =>
        list[key].name.includes(e.target.value.toLowerCase())
      )
      .reduce((obj: any, key: any) => {
        obj[key] = list[key];
        return obj;
      }, {});

    setFilter(e.target.value);
    setTypes(filtered);
  };

  const resetFilter = () => {
    setFilter("");
    setTypes(list);
    history.replace("/");
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setFavOpen(false);
  };

  const openMenu = () => {
    setMobileOpen(!isMobileOpen);
    setFavOpen(false);
  };

  return (
    <>
      <div
        className={`cursor-pointer modal-overlay transition absolute w-full h-full bg-gray-900 ${
          isMobileOpen || isFavOpen ? "opacity-50" : "hidden opacity-0"
        } z-40`}
        onClick={closeMenu}
      ></div>

      <div className="w-68 xs:w-88 xl:w-275 h-screen z-20">
        <div className="flex flex-col h-screen pr-4 fixed w-68 xs:w-88 xl:w-275">
          <Link to="/">
            <img
              className="mb-4 pt-4 inline-block mx-auto hidden lg:block"
              width="200px"
              src="https://cdn.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"
              alt="Pokedex App - All Pokemon"
            />
          </Link>
          <button
            className="ml-3 mt-2 lg:hidden focus:outline-none"
            onClick={openMenu}
            aria-label="Open Menu"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* TODO: Favorites mobile menu drawer */}

          {/* <aside
            className={`transform top-0 right-0 w-64 bg-white fixed h-full overflow-y-scroll ease-in-out transition-all duration-300 z-40 ${
              isFavOpen ? "-translate-x-0" : "translate-x-full"
            }`}
          >
            {" "}
            <div className="bg-gray-300 m-2">
              <h1 className="flex justify-between text-dark bg-gray-200 text-md font-bold p-3 border-b border-dim-200">
                Your Favorites
                <StarOutline className="text-orange-400" />
              </h1>

              <div className="text-black-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-gray-200 cursor-pointer transition duration-350 ease-in-out">
                <div className="flex flex-row justify-between p-2">
                  <div className="flex flex-row">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
                      alt="Joe Biden"
                    />
                    <div className="flex text-left flex-col ml-2">
                      <h1 className="text-dark font-bold text-sm">Charizard</h1>
                      <p className="text-gray-500 text-sm">Some notes here</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center h-full text-white">
                      <button className="text-xs font-bold text-red-600 px-2 py-1 rounded-full border-2 border-red-600 hover:border-red-700 hover:text-red-700 focus:outline-none">
                        <TrashOutline size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside> */}

          {/* TODO: separate into MobileMenu component later and maybe use context api to track filtered data for both mobile/desktop menu */}
          
          <aside
            className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-40 ${
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="m-2 text-center">
              <Link to="/">
                <img
                  className="my-4 inline-block mx-auto lg:block"
                  width="200px"
                  src="https://cdn.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"
                  alt="Pokedex App - All Pokemon"
                />
              </Link>
            </div>

            <div className="relative m-2 text-center">
              <div className="absolute text-gray-600 flex items-center pl-4 h-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </svg>
              </div>
              <input
                className="w-full max-w-md bg-gray-100 border-dim-400 text-gray-800 focus:bg-gray focus:outline-none focus:border focus:border-blue-200 font-normal px-4 py-2 flex items-center pl-12 text-sm rounded-full border shadow"
                placeholder="Search Type..."
                value={filter}
                onChange={filterList}
              />
            </div>

            <div className="relative m-2">
              <button
                onClick={resetFilter}
                className={`${
                  filter ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-500"
                } w-full cursor-pointer text-center relative transition px-4 py-2 rounded-full text-white focus:outline-none`}
              >
                <FilterOutline className="absolute" />
                <p>Reset Filter</p>
              </button>
            </div>

            <ul className="mt-10 ml-6 nav-list overflow-y-scroll">
              <AnimatePresence initial={false} exitBeforeEnter>
                {Object.keys(types).map((typeId: any, i: number) => (
                  <motion.li
                    key={i}
                    initial={variants.hidden}
                    animate={variants.show}
                    exit={variants.hidden}
                  >
                    <NavLink
                      onClick={closeMenu}
                      to={`/type/${types[typeId].name}`}
                      className="flex items-center justify-left xl:justify-start text-gray mb-8"
                    >
                      <Template className="text-gray-400" />
                      <span className="capitalize xl:block ml-4 text-md">
                        {types[typeId].name}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </aside>

          <div className="hidden lg:block relative m-2">
            <div className="absolute text-gray-600 flex items-center pl-4 h-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-mail"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </svg>
            </div>
            <input
              className="w-full max-w-md bg-gray-100 border-dim-400 text-gray-800 focus:bg-gray focus:outline-none focus:border focus:border-blue-200 font-normal px-4 py-2  flex items-center pl-12 text-sm rounded-full border shadow"
              placeholder="Search Type..."
              value={filter}
              onChange={filterList}
            />
          </div>

          <button
            onClick={resetFilter}
            className={`${
              filter ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-500"
            } hidden lg:block cursor-pointer m-2 text-center relative transition px-4 py-2 rounded-full text-white focus:outline-none`}
          >
            <FilterOutline className="absolute" />
            <p>Reset Filter</p>
          </button>

          <ul className="hidden lg:block mt-5 ml-6 nav-list overflow-y-scroll">
            <AnimatePresence initial={false} exitBeforeEnter>
              {Object.keys(types).map((typeId: any, i: number) => (
                <motion.li
                  key={i}
                  initial={variants.hidden}
                  animate={variants.show}
                  exit={variants.hidden}
                >
                  <NavLink
                    to={`/type/${types[typeId].name}`}
                    className="flex items-center justify-center xl:justify-start text-gray mb-8"
                  >
                    <Template className="text-gray-400" />
                    <span className="capitalize xl:block ml-4 text-md">
                      {types[typeId].name}
                    </span>
                  </NavLink>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </>
  );
};
