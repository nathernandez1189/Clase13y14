import React from 'react';

const LayoutContainerForm = ({ title, children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {title && <h2 style={styles.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5", // Fondo claro
    padding: "20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff", // Fondo blanco
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
};

export default LayoutContainerForm;