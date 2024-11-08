import React, { useEffect, useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  //Registro con Firebase
  const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  //Log In con Firebase
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  //Log Out con Firebase
  const signOutUser = () => {
    signOut(auth);
  };

  //Mantener el usuario presente en el sitio

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });

    return () => unsuscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

//Validación de props
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
