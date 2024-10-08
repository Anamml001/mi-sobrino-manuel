"use client"
import React, { useState } from 'react';
import CardProduct from '../components/CardProduct';
import ProductDetail from '../components/ProductDetail';

const products = [
    {
        title: 'BOLSA TELA',
        image: '/bolsa-tela.png',
        price: '5,00 €',
    },
    {
        title: 'MOCHILA',
        image: '/mochila.png',
        price: '5,00 €',
    },
    {
        title: 'TAZA',
        image: '/taza.png',
        price: '5,00 €',
    },
    {
        title: 'CAMISETA VERDE',
        image: '/camiseta-verde.png',
        price: '8,00 €',
    },
    {
        title: 'CAMISETA BLANCA',
        image: '/camiseta-blanca.png',
        price: '8,00 €',
    },
    {
        title: 'BOTELLA',
        image: '/botella.png',
        price: '12,00 €',
    },
    {
        title: 'JUEGO DE JENGAS',
        image: '/juego-jengas.png',
        price: '15,00 €',
    },
];

const ShopPage: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Estado para manejar el producto seleccionado

    const handleClick = (product: any) => {
        setSelectedProduct(product); // Actualiza el producto seleccionado
    };

    const handleAddToCart = (quantity: number, size: string) => {
        console.log(`Añadir ${quantity} unidad(es) de ${selectedProduct.title} (Talla: ${size}) al carrito.`);
        // Aquí puedes implementar la lógica para añadir al carrito
    };

    const handleBack = () => {
        setSelectedProduct(null); // Regresar a la lista de productos
    };

    return (
        <div>
            {selectedProduct ? (
                <ProductDetail
                    title={selectedProduct.title}
                    price={selectedProduct.price}
                    image={selectedProduct.image}
                    onAddToCart={handleAddToCart}
                    onBack={handleBack} // Pasar la función para volver
                />
            ) : (
                <div style={styles.container}>
                    <h1 className="mt-10 font-bold text-2xl text-center text-green-900">TIENDA SOLIDARIA</h1>
                    {products.map((product) => (
                        <CardProduct
                            key={product.title}
                            title={product.title}
                            image={product.image}
                            onClick={() => handleClick(product)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center',
        color: '#13634b',
        marginBottom: '20px',
    },
};

export default ShopPage;
