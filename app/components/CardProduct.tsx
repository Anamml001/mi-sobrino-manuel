import React from 'react';

interface CardProductProps {
  title: string;
  image: string;
  onClick: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({ title, image, onClick }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.imageContainer}>
        <img src={image} alt={title} style={styles.image} />
      </div>
      <button style={styles.button} onClick={onClick}>
        Opciones →
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    textAlign: 'center' as 'center',
    backgroundColor: '#e0f0ec',
    margin: '20px 0',
  },
  title: {
    color: '#13634b',
    fontSize: '18px',
    marginBottom: '12px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',  // Incrementa el tamaño del contenedor
    backgroundColor: '#c7e3da',
    borderRadius: '12px',
    marginBottom: '12px',
    padding: '10px', // Espaciado interno para evitar que la imagen toque los bordes
  },
  image: {
    maxWidth: '90%',  // La imagen ocupará un mayor porcentaje del contenedor
    maxHeight: '90%', // La imagen se ajusta proporcionalmente dentro del contenedor
    objectFit: 'contain', // Mantiene las proporciones sin deformar
  },
  button: {
    backgroundColor: '#13634b',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default CardProduct;

