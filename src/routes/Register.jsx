import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";

import FormInput from "../componentes/FormInput";
import FormError from "../componentes/FormError";
import Title from "../componentes/Title";
import Button from "../componentes/Button";

const Register = () => {
  //const [email, setEmail] = useState("natalia_a.hernandez@uao.edu.co");
  //const [password, setPassword] = useState("12345");
  const { registerUser } = useContext(UserContext);
  const navegate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const onSubmit = async ({ email, password }) => {
    console.log("Procesando formulario--->_", email, password);
    try {
      await registerUser(email, password);
    } catch (error) {
      console.log(error, code);
    }
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault(); //Previene recargar todo el sitio

    console.log("Enviando datos: ", email, " ", password);
    try {
      await registerUser(email, password);
    } catch (error) {
      console.log(error.code);
    }
  };*/

  return (
    <>
      <Title text="Register" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          name=""
          id=""
          placeholder="Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        {/* {errors.email && <p>{errors.email.message} </p>} */}
        <FormInput
          type="password"
          name=""
          id=""
          placeholder="Password"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu Constraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          name=""
          id=""
          placeholder="Password"
          {...register("password2", {
            validate: validateEquals(getValues("password2")),
          })}
          label="Repite la contraseña"
          error={errors.password2}
        >
          <FormError error={errors.password2} />
        </FormInput>
        {/* {errors.password2 && <p>{errors.password2.message} </p>} */}
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default Register;
