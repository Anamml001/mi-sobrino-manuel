"use client"
import Link from "next/link";
import { FormEvent } from "react";
import logic from "../logic";
import { useRouter } from "next/navigation";
import useSessionContext from "../useSessionContext";

// Definimos los tipos para las propiedades del componente

class ContentError extends Error { }
class MatchError extends Error { }

const Login: React.FC = () => {
  const { setLoggedIn } = useSessionContext()
  const router = useRouter()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      logic.loginUser(email, password)
        .then(() => onUserLoggedIn())
        .catch(error => {
          console.error(error)

          let feedback = error.message

          if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
          else if (error instanceof MatchError)
            feedback = `${feedback}, please verify credentials`
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
  const onUserLoggedIn = () => {
    // window.location.href = '/'
    setLoggedIn(true)
    router.push('/')
  }


  return (<>
    <main className=" mt-24 px-20">
      <h1 className="font-bold text-2xl text-center mb-10 text-green-900">Login</h1>

      <form className="flex flex-col gap-2 mb-5" onSubmit={handleSubmit}>
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
export default Login