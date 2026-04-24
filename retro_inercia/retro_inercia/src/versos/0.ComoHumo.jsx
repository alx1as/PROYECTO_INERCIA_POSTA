import "./0.ComoHumo.css";
import { useRef, useState, useEffect } from "react";

export default function ComoHumo({ onFinish }) {
  const videoRef = useRef(null);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  const manejarFinVideo = () => {
    videoRef.current?.pause();
    setMostrarTexto(true);
  };

  useEffect(() => {
    if (!mostrarTexto) return;

    const timeout = setTimeout(() => {
      onFinish?.();
    }, 2800);

    return () => clearTimeout(timeout);
  }, [mostrarTexto, onFinish]);

return (
  <section className="humo-contenedor">
    <div className="humo-marco">
      <video
        ref={videoRef}
        className="humo-video"
        src="/humo.mp4"
        autoPlay
        muted
        playsInline
        onEnded={manejarFinVideo}
      />
    </div>

    {mostrarTexto && (
      <div className="humo-verso">
        <p className="linea-humo linea-1">como humo</p>
        <p className="linea-humo linea-2">entre tus dientes</p>
      </div>
    )}
  </section>
);
}