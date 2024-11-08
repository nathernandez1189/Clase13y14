import React from "react";

const FormError = ({ error }) => {
  //   console.log("Procesando formulario--->_", email, password);
  return (
    <>
      {error && (
        <p className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
          <span className="font-medium">OOPs!</span>
          {error.message}
        </p>
      )}
    </>
  );
};

export default FormError;
