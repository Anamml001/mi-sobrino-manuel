// app/components/Header.tsx
"use client"; // Marca este componente como un Client Component

import Image from 'next/image';
import React from 'react';

interface HeaderProps {
  user?: { name: string };
  handleLogout: () => void;
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout, handleLoginClick, handleRegisterClick }) => {
  return (
    <header className="flex items-center border-b-2 bg-teal-700 border-black fixed top-0 w-full h-15 box-border z-10">
      {!user ? (
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
