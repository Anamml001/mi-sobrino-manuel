import React from 'react';
import Image from 'next/image';

const FloatingWhatsAppButton: React.FC = () => {
    const whatsappNumber = '34630248450'; // Reemplaza con tu número de WhatsApp
    const message = '¡Hola! Me gustaría obtener más información.';

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            className="fixed bottom-8 right-1 bg-teal-400 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <Image
                src="/whatsApp-logo.png" // Asegúrate de que la imagen esté en la carpeta 'public'
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-5 h-5"
            />
        </a>
    );
};

export default FloatingWhatsAppButton;
