import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Para redirigir al usuario
import { UserContext } from '../context/UserContext'; // Ajusta la ruta según tu proyecto

const LayoutRequireAuth = ({ children }) => {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto

  if (!user) {
    // Si no hay usuario, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si hay usuario, renderizar los hijos
  return <>{children}</>;
};

export default LayoutRequireAuth;