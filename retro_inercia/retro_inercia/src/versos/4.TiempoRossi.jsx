import "./4.TiempoRossi.css";
import { useState, useEffect, useMemo, useRef } from "react";
import p5 from "p5";
import { sketch } from "../backgrounds/4.TiempoRossi.jsx";

export default function TiempoRossi({ onFinish }) {
  const texto = useMemo(
    () => "¿Era un año largo como un siglo\no un siglo corto\ncomo un día?",
    []
  );

  const [visible, setVisible] = useState("");
  const fondoRef = useRef(null);

  useEffect(() => {
    const instancia = new p5(sketch, fondoRef.current);
    return () => instancia.remove();
  }, []);

  useEffect(() => {
    if (visible.length >= texto.length) return;

    const siguienteCaracter = texto[visible.length];
    let delay = Math.floor(Math.random() * 55) + 35;

    if (visible.length === 0) delay = 700;
    if (Math.random() > 0.9) delay += 120;

    if (["?", "¿", ",", "."].includes(siguienteCaracter)) delay += 180;
    else if (siguienteCaracter === " ") delay += 30;
    else if (siguienteCaracter === "\n") delay += 320;

    const timeout = setTimeout(() => {
      setVisible(texto.slice(0, visible.length + 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [visible, texto]);

  useEffect(() => {
    if (visible.length !== texto.length) return;

    const finalTimeout = setTimeout(() => {
      onFinish?.();
    }, 1600);

    return () => clearTimeout(finalTimeout);
  }, [visible, texto, onFinish]);

  return (
    <section className="rossi-contenedor">
      <div ref={fondoRef} className="rossi-p5-fondo" />

      <div className="rossi-layout">
        <span className="rossi-ref">REF. ROSSI_04</span>

        <div className="rossi-typing-area">
          <p>
            {visible}
            {visible.length < texto.length && <span className="cursor"></span>}
          </p>
        </div>
      </div>
    </section>
  );
}