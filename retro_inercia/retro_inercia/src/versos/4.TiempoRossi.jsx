import "./4.TiempoRossi.css";
import { useState, useEffect } from "react";

export default function TiempoRossi({ onFinish }) {
  const texto = "¿Era un año largo como un siglo\no un siglo corto\ncomo un día?";
  const [visible, setVisible] = useState("");
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    // 1. LÓGICA DE TIPEO
    if (visible.length < texto.length) {
      const siguienteCaracter = texto[visible.length];
      let delay = Math.floor(Math.random() * 120) + 80;

      if (visible.length === 0) delay = 1000;
      if (Math.random() > 0.9) delay += 250;

      if (["?", "¿", ",", "."].includes(siguienteCaracter)) {
        delay += 500;
      } else if (siguienteCaracter === " ") {
        delay += 120;
      } else if (siguienteCaracter === "\n") {
        delay += 800;
      }

      const timeout = setTimeout(() => {
        setVisible(texto.slice(0, visible.length + 1));
      }, delay);

      return () => clearTimeout(timeout);
    } 
    
    // 2. LÓGICA DE FINALIZACIÓN (Solo cuando el texto está completo)
    else if (!terminado) {
      setTerminado(true);
      const finalTimeout = setTimeout(() => {
        onFinish?.();
      }, 2000); // 2 segundos de calma tras el último caracter
      return () => clearTimeout(finalTimeout);
    }
  }, [visible, terminado, onFinish, texto]);

  return (
    <section className="rossi-contenedor">
      <div className="rossi-layout">
        <span className="rossi-ref">REF. ROSSI_04</span>
        <div className="rossi-typing-area">
          <p>
            {visible}
            <span className="cursor"></span>
          </p>
        </div>
      </div>
    </section>
  );
}