// app/layout.tsx
 "use client" 
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {

  // Define las funciones que espera el Header
  const handleLogout = () => {
    console.log("Logged out");
    // Aquí pones tu lógica de logout
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
    // Aquí pones tu lógica para cuando hagan click en Login
  };

  const handleRegisterClick = () => {
    console.log("Register clicked");
    // Aquí pones tu lógica para cuando hagan click en Register
  };

  // Simulación de usuario autenticado o no autenticado
  const user = { name: 'Manuel' }; // Simulación de usuario (puedes modificarlo o cargarlo dinámicamente)

  return (
    <html lang="es">
      <body className="bg-green-100 min-h-screen flex flex-col">
        <Header
          user={user}  // Pasamos el usuario como prop
          handleLogout={handleLogout}  // Pasamos la función de logout
          handleLoginClick={handleLoginClick}  // Pasamos la función de login
          handleRegisterClick={handleRegisterClick}  // Pasamos la función de registro
        />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

