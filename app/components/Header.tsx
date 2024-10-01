// app/components/Header.tsx
"use client"; // Marca este componente como un Client Component

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logic from '../logic';
import { userData } from '../types/types';
import errors from '../errors';
import React, { useEffect, useState } from 'react';
import useSessionContext from '../useSessionContext';

const { MatchError, ContentError } = errors

const Header: React.FC = () => {
  const { loggedIn, setLoggedIn } = useSessionContext()

  const router = useRouter()

  const [user, setUser] = useState<userData | null>(null)

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      try {
        logic.retrieveUser()
          .then((user: userData) => setUser(user))
          .catch((error: Error) => {
            console.error(error.message);

            let feedback = error.message;

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
              feedback = `${feedback}, please correct it`;
            else if (error instanceof MatchError)
              feedback = `${feedback}, please verify user`;
            else
              feedback = 'sorry, there was an error, please try again later';

            alert(feedback);
          });
      } catch (error) {
        console.error((error as Error).message);

        let feedback = (error as Error).message;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
          feedback = `${feedback}, please correct it`;
        else
          feedback = 'sorry, there was an error, please try again later';

        alert(feedback);
      }
    }

  }, [loggedIn])


  const handleLoginClick = (): void => {
    router.push("/login")
  }

  const handleRegisterClick = (): void => {
    router.push("/register")
  }

  const handleLogout = (): void => {
    logic.logoutUser()
    setLoggedIn(false)
    setUser(null)
    router.push("/register")
  }

  return (
    <header className="flex items-center border-b-2 bg-teal-700 border-black fixed top-0 w-full h-15 box-border z-10">
      {user === null ? (
        <>
          <button className="px-1 rounded-md border mr-2 text-white" onClick={handleRegisterClick}>
            Register
          </button>
          <button className="px-1 rounded-md border text-white mr-6" onClick={handleLoginClick}>
            Login
          </button>
        </>
      ) : (
        <h1 className="text-white text-start p-8">Hola, {user.name}!</h1>
      )}
      <div className="object-center h-20 w-30">
        <Image src="/logotipo-MSM-04.png" alt="Logo" width={120} height={80} className="h-20 w-30" />
      </div>
      {user && (
        <button className="h-12 w-12 absolute inset-y-0 right-0 top-4 mr-2" id="logout-button" onClick={handleLogout}>
          <Image src="/salida.png" alt="Logout" width={24} height={24} />
        </button>
      )}
    </header>
  );
};

export default Header;
