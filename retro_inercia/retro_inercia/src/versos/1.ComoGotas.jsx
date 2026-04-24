import "./1.ComoGotas.css";
import { useEffect, useState } from "react";

export default function ComoGotas({ onFinish }) {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  useEffect(() => {
    const aparecerTexto = setTimeout(() => {
      setMostrarTexto(true);
    }, 1300);

    return () => clearTimeout(aparecerTexto);
  }, []);

  useEffect(() => {
    if (!mostrarTexto) return;

    const terminarEscena = setTimeout(() => {
      onFinish?.();
    }, 5600);

    return () => clearTimeout(terminarEscena);
  }, [mostrarTexto, onFinish]);

  return (
    <section className="gotas-contenedor">
      <img
        className="gotas-imagen"
        src="/1.ComoGotas.png"
        alt="Estanque oscuro con renacuajos"
      />

      <div className="gotas-sombra" />
      <div className="gotas-niebla" />

      {mostrarTexto && (
        <div className="gotas-verso">
          <p>como gotas atrapadas</p>
          <p>en un estanque</p>
          <p>lleno de renacuajos</p>
        </div>
      )}
    </section>
  );
}