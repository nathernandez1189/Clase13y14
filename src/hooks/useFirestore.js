import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid"; // Asegúrate de tener instalada esta dependencia
import { db, auth } from "../firebaseConfig"; // Ajusta la ruta según tu configuración

export const useFirestore = () => {
  const [data, setData] = useState([]); // Guardar Datos
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});

  // Función para obtener datos
  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Incluye el ID del documento
      setData(dataDB);
      console.log(dataDB);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  // Función para añadir datos
  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        enable: true,
        nanoid: nanoid(6), // Genera un ID único de 6 caracteres
        origin: url,
        uid: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "urls"), newDoc);
      setData((prevData) => [...prevData, { id: docRef.id, ...newDoc }]); // Incluye el ID del nuevo documento
      console.log("Documento añadido:", { id: docRef.id, ...newDoc });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  // Función para eliminar datos
  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, deleteData: true }));
      const docRef = doc(db, "urls", nanoid); // Referencia al documento en Firestore
      await deleteDoc(docRef); // Elimina el documento
      setData((prevData) =>
        prevData.filter((doc) => doc.nanoid !== nanoid)
      ); // Filtra los datos locales
      console.log("Documento eliminado:", nanoid);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, deleteData: false }));
    }
  };

  // Función para actualizar datos
  const updateData = async (nanoid, newOrigin) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true })); // Marca el inicio del estado de carga
      const docRef = doc(db, "urls", nanoid); // Obtén la referencia del documento a actualizar
      await updateDoc(docRef, { origin: newOrigin }); // Actualiza el campo "origin" en Firestore

      // Actualiza el estado local de los datos
      setData((prevData) =>
        prevData.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newOrigin } : item
        )
      );

      console.log("Item actualizado correctamente");
    } catch (error) {
      console.error(error);
      setError(error.message); // Guarda el mensaje de error en el estado
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false })); // Marca el fin del estado de carga
    }
  };

  // Función para buscar datos (por ejemplo, por nanoid)
  const searchData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, searchData: true }));
      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("nanoid", "==", nanoid));
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return result[0] || null; // Retorna el primer resultado o null si no existe
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, searchData: false }));
    }
  };

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
    searchData,
  };
};