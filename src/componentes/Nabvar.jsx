import { UserContext } from "../context/UserProvider";
import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
//React from "react";

const Nabvar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const handleClicklogOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log("Error al cerrar sesión: ", error.code);
    }
  };
  const classButtonBlue =
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const classButtonRed =
    "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {user ? (
            <>
              <NavLink to="/" className="flex item-center">
                |Inicio|
              </NavLink>
              <button onClick={handleClicklogOut} className={classButtonBlue}>
                {" "}
                |Logout|{" "}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classButtonRed}>
                |Login|
              </NavLink>
              <NavLink to="/register" className={classButtonRed}>
                |Register|
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nabvar;
