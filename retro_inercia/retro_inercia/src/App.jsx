import React, { useState, useCallback } from 'react'; // Importación corregida
import Insisto from './versos/2.Insisto';
import DescansoOfelia from './versos/3.DescansoOfelia';
import TiempoRossi from './versos/4.TiempoRossi';
import TeQuise_Final from './versos/6.TeQuise_Final'; // Agregado el componente final

export default function App() {
  const [escena, setEscena] = useState(0);

  const siguienteEscena = useCallback(() => {
    setTimeout(() => {
      setEscena(prev => prev + 1);
    }, 2000);
  }, []); 

  return (
    <div>
      {escena === 0 && <Insisto onFinish={siguienteEscena} />}
      {escena === 1 && <DescansoOfelia onFinish={siguienteEscena} />}
      {escena === 2 && <TiempoRossi onFinish={siguienteEscena} />}
      {escena === 3 && <TeQuise_Final onFinish={siguienteEscena} />}
    </div>
  );
}