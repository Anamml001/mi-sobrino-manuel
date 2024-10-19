"use client"

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode, useState } from 'react';
import logic from './logic';
import SessionContext from './SessionContext';
import InstagramLink from './components/InstagramLink';



export default function RootLayout({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(logic.isUserLoggedIn())

  return (
    <html lang="es">
      <body className="bg-green-100 min-h-screen flex flex-col">
        <SessionContext.Provider value={{ loggedIn, setLoggedIn: (loggedIn: boolean) => { setLoggedIn(loggedIn) } }}>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <h2 className="w-full h-24 mb-6 mt-2 bg-cyan-900 text-center flex items-center justify-center">
            <span className="text-white text-lg md:text-2xl mb-7 md:mb-0">
              Sigue a @misobrinomanuel en&nbsp;
            </span>
            <a
              href="https://www.instagram.com/misobrinomanuel/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
            </a>
            <InstagramLink />
          </h2>




          <Footer />
        </SessionContext.Provider>
      </body>
    </html>
  );
}

