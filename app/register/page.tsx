import Image from "next/image";
import Link from "next/link";
export default function Register() {
    return <>
    <main className="px-20">
    <h1 className=" mt-12 font-bold text-2xl text-center mb-10 text-green-900">Register</h1>

    <form className="flex flex-col gap-2 mb-5">
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
