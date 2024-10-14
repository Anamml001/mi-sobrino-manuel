import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const InstagramLink: React.FC = () => {
    return (
        <Link href="https://www.instagram.com/misobrinomanuel/" target="_blank">
            <div className=' flex justify-center items-center mb-6 md:mb-0 min-h-[50px]'>
                <Image
                    src="/instagram.png" // Cambia por la ruta de tu ícono
                    alt="Instagram"
                    width={30} // Ajusta el tamaño del ícono según sea necesario
                    height={30}
                    style={styles.icon}
                />
            </div>
        </Link>
    );
};

const styles: { [key: string]: React.CSSProperties } = {

    // icon: {
    //     filter: 'invert(100%)', // Si quieres que el ícono sea blanco sobre fondo de color, usa esta propiedad
    //     marginBottom: '46px'

    // },
};

export default InstagramLink;
