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
    <header className="flex items-center justify-between bg-teal-700 border-b-2 fixed top-0 w-full h-20 z-10 p-1"> {/* Cambié h-16 a h-20 */}
      <div className="flex items-center">
        {user === null ? (
          <>
            <button className="px-3 rounded-md border mr-1 text-white" onClick={handleRegisterClick}>
              Register
            </button>
            <button className="px-3 rounded-md border text-white" onClick={handleLoginClick}>
              Login
            </button>
          </>
        ) : (
          <h1 className="text-white text-start">Hola, {user.name}!</h1>
        )}
      </div>

      <div className="flex-grow flex justify-center items-center">
        <Image
          src="/logotipo-MSM-04.png"
          alt="Logo"
          width={120}
          height={80}
          className="h-auto w-auto"
        />
      </div>

      {user && (
        <button
          className="h-12 w-12 flex items-center justify-center"
          id="logout-button"
          onClick={handleLogout}
        >
          <Image src="/salida.png" alt="Logout" width={24} height={24} />
        </button>
      )}
    </header>


  );
};

export default Header;
