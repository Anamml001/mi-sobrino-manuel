// "use client";
// import React, { useState } from 'react';
// import CardProduct from '../components/CardProduct';
// import ProductDetail from '../components/ProductDetail';

// const products = [
//     { title: 'BOLSA TELA', image: '/bolsa-tela.png', price: '5,00 €' },
//     { title: 'MOCHILA', image: '/mochila.png', price: '5,00 €' },
//     { title: 'TAZA', image: '/taza.png', price: '5,00 €' },
//     { title: 'CAMISETA VERDE', image: '/camiseta-verde.png', price: '8,00 €' },
//     { title: 'CAMISETA BLANCA', image: '/camiseta-blanca.png', price: '8,00 €' },
//     { title: 'BOTELLA 400 ML', image: '/botella-400ml.png', price: '5,00 €' },
//     { title: 'BOTELLA 800 ML', image: '/botella-800ml.png', price: '6,00 €' },
//     { title: 'PULSERA', image: '/pulsera.png', price: '1,00 €' },
//     { title: 'JUEGO DE JENGAS', image: '/juego-jenga.png', price: '6,00 €' },
// ];

// const ShopPage: React.FC = () => {
//     const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

//     const handleClick = (product: any) => {
//         setSelectedProduct(product);
//     };

//     const handleAddToCart = (quantity: number, size: string) => {
//         console.log(`Añadir ${quantity} unidad(es) de ${selectedProduct.title} (Talla: ${size}) al carrito.`);
//     };

//     const handleBack = () => {
//         setSelectedProduct(null);
//     };

//     return (
//         <div>
//             {selectedProduct ? (
//                 <ProductDetail
//                     title={selectedProduct.title}
//                     price={selectedProduct.price}
//                     image={selectedProduct.image}
//                     onAddToCart={handleAddToCart}
//                     onBack={handleBack}
//                 />
//             ) : (
//                 <div style={styles.container}>
//                     <h1 className="mt-10 font-bold text-2xl text-center text-green-900">TIENDA SOLIDARIA</h1>
//                     <div style={styles.productsGrid}>
//                         {products.map((product) => (
//                             <div key={product.title} style={styles.productCard}>
//                                 <CardProduct
//                                     title={product.title}
//                                     image={product.image}
//                                     onClick={() => handleClick(product)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//     container: {
//         padding: '20px',
//         maxWidth: '1200px',
//         margin: '0 auto',
//         backgroundColor: '#f5f5f5',
//     },
//     title: {
//         textAlign: 'center',
//         color: '#13634b',
//         marginBottom: '20px',
//     },
//     productsGrid: {
//         display: 'flex',
//         flexWrap: 'wrap', // Permite que los productos se distribuyan en filas
//         justifyContent: 'space-between', // Distribuye uniformemente
//     },
//     productCard: {
//         flexBasis: '100%', // Ocupa 100% en pantallas pequeñas
//         maxWidth: '300px',
//         margin: '10px',
//     },
// };

// // Añadir reglas de estilo responsivo para ajustar el diseño en pantallas más grandes
// const stylesMedia = `
//   @media (min-width: 768px) {
//     .productCard {
//       flex-basis: 45%; /* Dos productos por fila en pantallas medianas */
//     }
//   }

//   @media (min-width: 1024px) {
//     .productCard {
//       flex-basis: 22%; /* Cuatro productos por fila en pantallas grandes */
//     }
//   }
// `;

// export default ShopPage;
"use client";
import React, { useState, useEffect } from 'react';
import CardProduct from '../components/CardProduct';
import ProductDetail from '../components/ProductDetail';
import retrieveProducts from '../logic/retrieveProducts'; // Asegúrate de ajustar la ruta según tu estructura

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]); // Estado para almacenar productos obtenidos de la API
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Estado para el producto seleccionado
    const [error, setError] = useState<string | null>(null); // Estado para almacenar errores

    // Efecto para obtener los productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Aquí no se requiere userId, así que solo llama a retrieveProducts
                const data = await retrieveProducts(); // Pasa un string vacío o una opción válida si tu lógica lo permite
                setProducts(data); // Establece los productos en el estado
            } catch (error) {
                // Manejo de errores
                console.error('Error al obtener productos:', error);
                setError((error as Error).message); // Almacena el mensaje de error en el estado
            }
        };

        fetchProducts(); // Llama a la función al montar el componente
    }, []); // Solo se ejecuta al montar

    const handleClick = (product: any) => {
        setSelectedProduct(product); // Selecciona el producto al hacer clic
    };

    const handleAddToCart = (quantity: number, size: string) => {
        console.log(`Añadir ${quantity} unidad(es) de ${selectedProduct.name} (Talla: ${size}) al carrito.`);
    };

    const handleBack = () => {
        setSelectedProduct(null); // Regresa a la vista de lista de productos
    };

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Muestra errores si existen */}
            {selectedProduct ? (
                <ProductDetail
                    title={selectedProduct.name}
                    price={`${selectedProduct.price} €`}
                    image={selectedProduct.image}
                    onAddToCart={handleAddToCart}
                    onBack={handleBack}
                />
            ) : (
                <div style={styles.container}>
                    <h1 className="mt-10 font-bold text-2xl text-center text-green-900">TIENDA SOLIDARIA</h1>
                    <div style={styles.productsGrid}>
                        {products.map((product) => (
                            <div key={product.id} style={styles.productCard}>
                                <CardProduct
                                    title={product.name} // Cambia a 'name' según tu API
                                    image={product.image}
                                    onClick={() => handleClick(product)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
    },
    productsGrid: {
        display: 'flex',
        flexWrap: 'wrap', // Permite que los productos se distribuyan en filas
        justifyContent: 'space-between', // Distribuye uniformemente
    },
    productCard: {
        flexBasis: '100%', // Ocupa 100% en pantallas pequeñas
        maxWidth: '300px',
        margin: '10px',
    },
};

export default ShopPage;


