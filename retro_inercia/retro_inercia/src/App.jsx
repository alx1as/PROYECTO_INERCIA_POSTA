import React, { useState, useCallback, useEffect, useRef } from 'react';

import ComoHumo from './versos/0.ComoHumo';
import ComoGotas from './versos/1.ComoGotas';
import Insisto from './versos/2.Insisto';
import DescansoOfelia from './versos/3.DescansoOfelia';
import TiempoRossi from './versos/4.TiempoRossi';

import TeQuise_Final from './versos/6.TeQuise_Final';

export default function App() {
  const [escena, setEscena] = useState(0);
  const timeoutRef = useRef(null);

  const irAEscena = useCallback((numero) => {
    clearTimeout(timeoutRef.current);
    setEscena(numero);
  }, []);

  const siguienteEscena = useCallback(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setEscena(prev => Math.min(prev + 1, 6));
    }, 2000);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key >= "0" && e.key <= "6") {
        irAEscena(Number(e.key));
      }

      if (e.key === "ArrowRight") {
        clearTimeout(timeoutRef.current);
        setEscena(prev => Math.min(prev + 1, 6));
      }

      if (e.key === "ArrowLeft") {
        clearTimeout(timeoutRef.current);
        setEscena(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(timeoutRef.current);
    };
  }, [irAEscena]);

  return (
    <div key={escena}>
      {escena === 0 && <ComoHumo onFinish={siguienteEscena} />}
      {escena === 1 && <ComoGotas onFinish={siguienteEscena} />}
      {escena === 2 && <Insisto onFinish={siguienteEscena} />}
      {escena === 3 && <DescansoOfelia onFinish={siguienteEscena} />}
      {escena === 4 && <TiempoRossi onFinish={siguienteEscena} />}
    
      {escena === 5 && <TeQuise_Final onFinish={siguienteEscena} />}
    </div>
  );
}