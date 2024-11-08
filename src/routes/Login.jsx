import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState("natalia_a.hernandez@uao.edu.co");
  const [password, setPassword] = useState("123456789");
  const { loginUser } = useContext(UserContext);
  const navega = useNavigate();
  /*const {
    login,
    handleSubmitLog,
    formState: { errors },
    getValues,
  } = useForm();*/

  const handleSubmitLogin = async (e) => {
    console.log("data event ->_ :", e);
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log("Usuario logueado");
      navega("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmitLogin}>
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            /*{...login("email", {
              required: {
                value: true,
                message: "El campo es obligatorio",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Formato de Email incorrecto",
              },
            })}*/
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
