import "./4.TiempoRossi.css";
import { useEffect, useState } from "react";

export default function TiempoRossi({ onFinish }) {
  const [momento, setMomento] = useState(0);

  useEffect(() => {
    const tiempos = [
      setTimeout(() => setMomento(1), 700),
      setTimeout(() => setMomento(2), 3100),
      setTimeout(() => setMomento(3), 6200),
      setTimeout(() => onFinish?.(), 8500),
    ];

    return () => tiempos.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <section className="rossi-contenedor">
      <div className="rossi-luz" />

      <div className="rossi-layout">
        <div className={`rossi-bloque rossi-bloque-uno ${momento >= 1 ? "visible" : ""}`}>
          <p>¿Era un año largo</p>
          <p>como un siglo?</p>
        </div>

        <div className={`rossi-bloque rossi-bloque-dos ${momento >= 2 ? "visible" : ""}`}>
          <p>¿o un siglo corto</p>
          <p>como un día?</p>
        </div>

        <div className={`rossi-pulso ${momento >= 3 ? "visible" : ""}`} />
      </div>
    </section>
  );
}