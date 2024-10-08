import React, { useState } from 'react';

interface ProductDetailProps {
  title: string;
  price: string;
  image: string;
  onAddToCart: (quantity: number, size: string) => void;
  onBack: () => void; // Añadir la función para volver
}

const ProductDetail: React.FC<ProductDetailProps> = ({ title, price, image, onAddToCart, onBack }) => {
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [quantity, setQuantity] = useState<number>(1);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div style={styles.container}>
      <img src={image} alt={title} style={styles.image} />
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.price}>{price}</p>
      <p style={styles.label}>Talle: {selectedSize}</p>
      <div style={styles.sizes}>
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <button
            key={size}
            style={selectedSize === size ? styles.sizeButtonActive : styles.sizeButton}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <div style={styles.quantityContainer}>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          style={styles.quantityInput}
        />
        <button
          style={styles.addButton}
          onClick={() => onAddToCart(quantity, selectedSize)}
        >
          AÑADIR AL CARRITO
        </button>
      </div>
      <button style={styles.payButton}>Comprar con G Pay</button>
      <button style={styles.backButton} onClick={onBack}>Atrás</button> {/* Botón para volver */}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#13634b',
    marginBottom: '10px',
  },
  price: {
    fontSize: '20px',
    color: '#13634b',
    marginBottom: '20px',
  },
  label: {
    color: '#13634b',
    marginBottom: '10px',
  },
  sizes: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  sizeButton: {
    backgroundColor: '#c7e3da',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  sizeButtonActive: {
    backgroundColor: '#13634b',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  quantityContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  quantityInput: {
    width: '50px',
    textAlign: 'center',
    marginRight: '10px',
  },
  addButton: {
    backgroundColor: '#13634b',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  payButton: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  backButton: {
    backgroundColor: '#e74c3c', // Color rojo para el botón
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default ProductDetail;
