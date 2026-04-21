import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { sketch } from "../backgrounds/2.Insisto.jsx"; 
import "./2.Insisto.css";

export default function Insisto({onFinish}) {
  const contenedorRef = useRef();
  const [paso, setPaso] = useState(0); 
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timerFlash = setTimeout(() => setFlash(false), 150);

    // Tiempos de escritura (Paso 1 al 4)
    setTimeout(() => setPaso(1), 1600); 
    setTimeout(() => setPaso(2), 2800); 
    setTimeout(() => setPaso(3), 3320); 
    setTimeout(() => setPaso(4), 4760); 

    // Tiempos de borrado (Paso 5 al 8)
    setTimeout(() => setPaso(5), 6000); 
    setTimeout(() => setPaso(6), 6500); 
    setTimeout(() => setPaso(7), 7000); 
    setTimeout(() => setPaso(8), 9000); 

    // Cierre (Paso 9 y 10)
    setTimeout(() => setPaso(9), 11500); 
    setTimeout(() => setPaso(10), 11800);

    const instancia = new p5(sketch, contenedorRef.current);
    
    return () => {
      instancia.remove();
      clearTimeout(timerFlash);
    };
  }, []);

  // Control del fondo y las fases
  let claseFase = "";
  if (paso >= 2) claseFase = "insisto-p5-visible insisto-fase-timida"; 
  if (paso >= 3) claseFase = "insisto-p5-visible insisto-fase-densa";  
  if (paso >= 8) claseFase += " insisto-fase-final";

  useEffect(() => {
  if (paso === 10) {
    onFinish?.();
  }
}, [paso]); //cuando termina pasa al sgte componente


  return (
    <section className={`insisto-wrapper ${flash ? "insisto-flash-inicio" : ""} ${claseFase} ${paso >= 9 ? "insisto-corte-final" : ""} ${paso >= 10 ? "insisto-blackout" : ""}`}>
      <div ref={contenedorRef} className="insisto-canvas-container" />
      
      <div className="insisto-texto-container">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="insisto-col-izq">
          {paso >= 1 && (
            <h1 
              className={`insisto-texto-neon insisto-texto-principal insisto-anim-maquina insisto-flash-post ${paso > 1 ? "insisto-sin-cursor" : ""} ${paso >= 8 ? "insisto-desaparecer" : ""}`} 
              style={{ "--pasos": 7, "--tiempo": "0.84s" }}
            >
              INSISTO
            </h1>
          )}
        </div>

        {/* COLUMNA DERECHA */}
        <div className="insisto-col-der">
          {paso >= 2 && (
            <h2 
              className={`insisto-texto-neon insisto-texto-verso insisto-anim-maquina ${paso > 2 ? "insisto-sin-cursor" : ""} ${paso >= 7 ? "insisto-desaparecer" : ""}`} 
              style={{ "--pasos": 10, "--tiempo": "1.08s" }}
            >
              CON QUERER
            </h2>
          )}
          {paso >= 3 && (
            <h2 
              className={`insisto-texto-neon insisto-texto-verso insisto-anim-maquina ${paso > 3 ? "insisto-sin-cursor" : ""} ${paso >= 6 ? "insisto-desaparecer" : ""}`} 
              style={{ "--pasos": 17, "--tiempo": "2.04s" }}
            >
               A CADA UNO DE TUS
            </h2>
          )}
          {paso >= 4 && (
            <h1 
              className={`insisto-texto-neon insisto-texto-cierre insisto-anim-maquina ${paso > 4 ? "insisto-sin-cursor" : ""} ${paso >= 5 ? "insisto-desaparecer" : ""}`} 
              style={{ "--pasos": 10, "--tiempo": "1.2s" }}
            >
              FANTASMAS.
            </h1>
          )}
        </div>

      </div>
    </section>
  );
}