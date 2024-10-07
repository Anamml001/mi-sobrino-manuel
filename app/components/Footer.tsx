import Link from 'next/link';
import Image from 'next/image';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
const Footer: React.FC = () => {
    return (
        <footer className="flex justify-center items-center border-t-2 bg-teal-700 fixed bottom-0 w-full  h-12 px-2 box-border align-end">
            <Link className="px-2 text-white ml-14 font-semibold" href="/recurses">
                Recursos
            </Link>
            <Link className="px-2 text-white font-semibold" href="/donate">
                Donar
            </Link>
            <div className='  w-5 h-5'><Link href="/"><Image src="/casa.png" alt="Home" width={20} height={20} className="w-5 h-5 cursor-pointer" />&nbsp;&nbsp;&nbsp;</Link></div>
            <Link className="px-2 text-white font-semibold" href="/gallery">Galería
            </Link>
            <Link className="px-2 text-white mr-14 font-semibold" href="/contact">Contacto
            </Link>
            <FloatingWhatsAppButton />
        </footer>
    );
};

export default Footer;