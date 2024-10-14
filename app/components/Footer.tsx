import Link from 'next/link';
import Image from 'next/image';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

const Footer: React.FC = () => {
    return (
        <footer className="flex justify-center items-center border-t-2 bg-teal-700 fixed bottom-0 w-full h-12 px-2 box-border">
            <div className="flex items-center justify-center w-full space-x-4"> {/* Contenedor para centrar */}
                <Link className="text-white font-semibold" href="/recurses">
                    Recursos
                </Link>

                <Link className="text-white font-semibold" href="/donate">
                    Donar
                </Link>

                <Link className="text-white font-semibold" href="/gallery">
                    Galería
                </Link>

                <Link className="text-white font-semibold" href="/shop">
                    Tienda
                </Link>

                <Link className="text-white font-semibold" href="/contact">
                    Contacto
                </Link>
            </div>
            <FloatingWhatsAppButton />
        </footer>
    );
};

export default Footer;
