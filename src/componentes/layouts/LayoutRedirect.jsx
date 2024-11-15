import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';

const LayoutRedirect = () => {
  const { nanoid } = useParams(); // Obtener el parámetro nanoid de la URL
  const { searchData } = useFirestore(); // Hook personalizado para buscar datos
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await searchData(nanoid); // Buscar datos por nanoid
        if (docSnap) {
          window.location.href = docSnap.origin; // Redirigir a la URL obtenida
        } else {
          console.error("Documento no encontrado");
        }
      } catch (error) {
        console.error("Error al buscar datos:", error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchData();
  }, [nanoid, searchData]);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un indicador de carga
  }

  return <div>Redirección fallida: URL no encontrada.</div>; // Mostrar mensaje si no se encuentra la URL
};

export default LayoutRedirect;

