import React from "react";

interface CardDefaultProps {
    title: string;
    description: string;
    image: string;
}

const CardDefault: React.FC<CardDefaultProps> = ({ title, description, image }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-green-300">
            <img className="w-full h-48 object-cover" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {/* Puedes añadir etiquetas o botones si es necesario */}
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    #recurso
                </span>
            </div>
        </div>
    );
};

export default CardDefault;
