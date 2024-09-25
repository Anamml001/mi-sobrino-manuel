import Image from "next/image";
import Link from "next/link";
export default function Login() {
  return (<>
<main className=" mt-24 px-20">
        <h1 className="font-bold text-2xl text-center mb-10 text-green-900">Login</h1>

        <form className="flex flex-col gap-2 mb-5" >
            <label htmlFor="email">Email</label>
            <input className="border-b-2 border-green-900 rounded-md" type="text" id="email" />

            <label htmlFor="password">Password</label>
            <input className="border-b-2 border-green-900 rounded-md" type="password" id="password" />

            <button className="rounded-xl border-2 border-green-900 px-3 self-end" type="submit">Login</button>
        </form>

         <Link className="underline block text-center text-green-900" href="/register">Register</Link>
    </main>
      </>
  )
}