"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { HomeCarousel } from "./components/HomeCarousel";
export default function Home() {
    const router = useRouter()
    return <div className="flex flex-col h-full p-4  ">
        <main>
            <HomeCarousel />
            <h1 className=" mt-10 text-center text-green-800 font-black text-2xl">SÍNDROME DE DANDY-WALKER </h1>

            <div className=" bg-teal-200 rounded-lg p-2 ">
                <p className=" mt-4 mb-10 text-center font-semibold text-2xl font-sans">Manuel es un niño de tres años con una enfermedad rara denominada Síndrome de Dandy -Walker, que consiste en la deformación del cerebelo. Todo ello conlleva diversas dificultades como pobre coordinación de movimientos, torpeza motora y espasticidad, hipersensibilidad al tacto, alteraciones en el desarrollo del lenguaje, hiperactividad, epilepsia y rasgos dismorficos. Esta enfermedad ha sido posiblementr causada por una mutación del gen RAC 1 que ha hecho que Manuel naciera con una cardiopatia congénita. Y digo posiblemente porque al ser una enfermedad rara y existir muy pocos casos en el mundo, no hay muchas investigaciones sobre ella a  día de hoy. Pero lo que más caracteriza a Manuel no son todas estas patologías o dificultades, sino su gran sonrisa, su simpatia, su caracter cariñoso, y su gran gusto por una buena fiesta!</p>
                <Link className="rounded-md bg-green-950 text-white flex justify-center " href="/recurses">
                    CONOCER MÁS
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <img src="home-img1.jpg" alt="img1" className="mx-auto h-112 md:max-w-sm lg:max-w-xl xl:max-w-2xl" />
                {/* <img src="home-img3.jpg" alt="img3" className="mx-auto h-96 md:max-w-xs lg:max-w-lg xl:max-w-xl" /> */}
                <img src="home-img2.jpg" alt="img2" className="mx-auto h-112 md:max-w-sm lg:max-w-xl xl:max-w-2xl" />
            </div>

            <h2 className=" mt-10 text-center text-green-800 font-black text-2xl">¿CUÁL ES NUESTRO OBJETIVO? </h2>
            <div className=" bg-teal-200 rounded-lg p-2 mb-2 ">
                <p className=" mt-4 mb-10 text-center font-semibold text-2xl font-sans">Recaudar fondos esenciales para la asociación y concienciar a la sociedad sobre la necesidad de investigar el síndrome Dandy- Walker, junto a otras enfermedades raras. La inversión en esta investigación hace que el futuro de los que sufren estas enfermedades venga con una mejor calidad de vida. </p>
                <Link className=" rounded-md bg-green-950 text-white flex justify-center " href="/donate">
                    REALIZAR UNA DONACIÓN
                </Link>
            </div>


        </main>


    </div>
}
