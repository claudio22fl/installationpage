"use client";
import React, { useState, useEffect } from 'react';
import MiniDrawer from '../AppBar';
import LoginForm from '@/app/Login/page';
import Loader from "react-loader-spinner";

export default function IsLogin({ children }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Simula una carga de datos (puedes reemplazar esto con tu lógica real)
    setTimeout(() => {
      const loggedIn = localStorage.getItem('loggedIn');
      setIsLoggedIn(loggedIn === 'true');
      setIsLoading(false); // Marcar como cargado una vez que los datos estén listos
    }, 2000); // Simulamos una carga de 2 segundos
  }, []);

  return (
    <div style={{ width: '100%', marginTop: '40px' }}>
      {isLoading ? (
         <MiniDrawer children={children} />
      ) : (
        isLoggedIn ? <MiniDrawer children={children} /> : <LoginForm />
      )}
    </div>
  );
}
