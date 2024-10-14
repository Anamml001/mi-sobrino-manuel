import { useRouter } from 'next/navigation'
function Donate() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="mt-10 font-bold text-2xl text-center text-green-900">DONACIONES</h1>
            <h2 className="p-4 font-bold text-center text-lg md:text-xl lg:text-2xl max-w-md px-4 lg:px-0">
                Ayudemos a Manuel para que la investigación del gen mutado RAC 1 se inicie.
                Un pequeño donativo puede mejorar el futuro de Manuel, y el de otros muchos niños y niñas. Si tienes alguna duda, solo tienes que contactarme en el link de WhatsApp.
            </h2>
            <h3 className="text-center text-green-500 font-bold mt-2">❤ MUCHAS GRACIAS ❤</h3>
            <div className="mt-4 lg:mt-12">
                <img
                    src="/bizum-img.jpg"
                    className="mx-auto h-96 md:max-w-xs lg:max-w-lg xl:max-w-xl"
                    alt="Bizum"
                />
            </div>
        </div>
    );
}

export default Donate;