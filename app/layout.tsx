"use client"

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode, useState } from 'react';
import logic from './logic';
import SessionContext from './SessionContext';



export default function RootLayout({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(logic.isUserLoggedIn())

  return (
    <html lang="es">
      <body className="bg-green-100 min-h-screen flex flex-col">
        <SessionContext.Provider value={{ loggedIn, setLoggedIn: (loggedIn: boolean) => { setLoggedIn(loggedIn) } }}>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </SessionContext.Provider>
      </body>
    </html>
  );
}

