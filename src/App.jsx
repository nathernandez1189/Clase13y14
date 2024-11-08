import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { UserContext } from "./context/UserProvider";
import Nabvar from "./componentes/Nabvar";
import RequireAuth from "./componentes/RequireAuth";
import Register from "./routes/Register";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);
  if (user === false) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Nabvar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
