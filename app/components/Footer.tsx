import Link from 'next/link';
import Image from 'next/image';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
const Footer: React.FC = () => {
    return (
        <footer className="flex justify-center items-center border-t-2 bg-teal-700 border-black fixed bottom-0 w-full  h-12 px-2 box-border align-end">
            <Link className="px-2 text-white ml-14" href="/recurses">
                Recursos
            </Link>
            <Link className="px-2 text-white" href="/donate">
                Donaciones
            </Link>
            <div className='  w-5 h-5'><Link href="/"><Image src="/casa.png" alt="Home" width={20} height={20} className="w-5 h-5 cursor-pointer" />&nbsp;&nbsp;&nbsp;</Link></div>
            <Link className="px-2 text-white" href="/galeria">Galería
            </Link>
            <Link className="px-2 text-white mr-14" href="/contact">Contacto
            </Link>
            <FloatingWhatsAppButton />
        </footer>
    );
};

export default Footer;