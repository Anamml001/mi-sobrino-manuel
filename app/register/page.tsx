"use client"
import Link from "next/link";
import { FormEvent } from "react";
import logic from "../logic";
import { useRouter } from "next/navigation";

// Definimos los tipos para las propiedades del componente

class ContentError extends Error { }
class DuplicityError extends Error { }

const Register: React.FC = () => {
    const router = useRouter()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget

        const name = (form.elements.namedItem('name') as HTMLInputElement).value
        const surname = (form.elements.namedItem('surname') as HTMLInputElement).value
        const birthdate = (form.elements.namedItem('birthdate') as HTMLInputElement).value
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value

        try {
            logic.registerUser(name, surname, birthdate, email, password)
                .then(() => onUserRegistered())
                .catch((error: Error) => {
                    console.error(error)

                    let feedback = error.message

                    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                        feedback = `${feedback}, please correct it`
                    else if (error instanceof DuplicityError)
                        feedback = `${feedback}, please try with another user`
                    else
                        feedback = 'sorry, there was an error, please try again later'

                    alert(feedback)
                })
        } catch (error) {
            console.error(error)

            let feedback = (error as Error).message

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`
            else
                feedback = 'sorry, there was an error, please try again later'

            alert(feedback)
        }
    }

    const onUserRegistered = () => {
        router.push("/login")
    }
    return <>
        <main className="px-20">
            <h1 className=" mt-12 font-bold text-2xl text-center mb-10 text-green-900">Register</h1>

            <form className="flex flex-col gap-2 mb-5" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input className=" rounded-md border-b-2 border-green-900" type="text" id="name" />

                <label htmlFor="surname">Surname</label>
                <input className=" rounded-md border-b-2 border-green-900" type="text" id="surname" />

                <label htmlFor="birthdate">Birthdate</label>
                <input className=" rounded-md border-b-2 border-green-900" type="date" id="birthdate" />

                <label htmlFor="email">E-mail</label>
                <input className=" rounded-md border-b-2 border-green-900" type="text" id="email" />

                <label htmlFor="password">Password</label>
                <input className=" rounded-md border-b-2 border-green-900" type="password" id="password" />

                <button className="rounded-xl border-2 border-green-900 px-3 self-end" type="submit">Register</button>
            </form>
            <Link className="underline block text-center text-green-900" href="/login">Login</Link>
        </main>
    </>
}
export default Register
