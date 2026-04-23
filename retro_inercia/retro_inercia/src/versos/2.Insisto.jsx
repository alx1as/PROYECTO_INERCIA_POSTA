import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { sketch } from "../backgrounds/2.Insisto.jsx";
import "./2.Insisto.css";

export default function Insisto({ onFinish }) {
  const contenedorRef = useRef(null);
  const [paso, setPaso] = useState(0);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timeouts = [];

    timeouts.push(setTimeout(() => setFlash(false), 120));

    // Apariciones
    timeouts.push(setTimeout(() => setPaso(1), 700));   // INSISTO golpe
    timeouts.push(setTimeout(() => setPaso(2), 1800));  // CON QUERER
    timeouts.push(setTimeout(() => setPaso(3), 2600));  // A CADA UNO DE TUS
    timeouts.push(setTimeout(() => setPaso(4), 3600));  // FANTASMAS.

    // Desgaste / desaparición
    timeouts.push(setTimeout(() => setPaso(5), 5200));
    timeouts.push(setTimeout(() => setPaso(6), 6100));
    timeouts.push(setTimeout(() => setPaso(7), 7000));
    timeouts.push(setTimeout(() => setPaso(8), 8300));

    // Corte final
    timeouts.push(setTimeout(() => setPaso(9), 9800));
    timeouts.push(setTimeout(() => setPaso(10), 10200));

    const instancia = new p5(sketch, contenedorRef.current);

    return () => {
      instancia.remove();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (paso === 10) onFinish?.();
  }, [paso, onFinish]);

  let claseFase = "";
  if (paso >= 1) claseFase += " insisto-p5-visible";
  if (paso >= 2) claseFase += " insisto-fase-timida";
  if (paso >= 3) claseFase += " insisto-fase-densa";
  if (paso >= 8) claseFase += " insisto-fase-final";

  return (
    <section
      className={`
        insisto-wrapper
        ${flash ? "insisto-flash-inicio" : ""}
        ${claseFase}
        ${paso >= 9 ? "insisto-corte-final" : ""}
        ${paso >= 10 ? "insisto-blackout" : ""}
      `}
    >
      <div className="insisto-bandas" />
      <div className="insisto-barrido" />
      <div ref={contenedorRef} className="insisto-canvas-container" />

      <div className="insisto-texto-container">
        <div className="insisto-col-izq">
          {paso >= 1 && (
            <div className={`insisto-stack ${paso >= 8 ? "insisto-desaparecer-lento" : ""}`}>
              <h1 className="insisto-fantasma insisto-fantasma-a">INSISTO</h1>
              <h1 className="insisto-fantasma insisto-fantasma-b">INSISTO</h1>
              <h1 className="insisto-texto-principal insisto-irrupcion">
                INSISTO
              </h1>
            </div>
          )}
        </div>

        <div className="insisto-col-der">
          {paso >= 2 && (
            <h2
              className={`
                insisto-texto-verso
                insisto-anim-maquina-suave
                ${paso >= 7 ? "insisto-desaparecer" : ""}
              `}
              style={{ "--pasos": 10, "--tiempo": "0.9s" }}
            >
              CON QUERER
            </h2>
          )}

          {paso >= 3 && (
            <h2
              className={`
                insisto-texto-verso
                insisto-texto-verso-bajo
                insisto-anim-maquina-suave
                ${paso >= 6 ? "insisto-desaparecer" : ""}
              `}
              style={{ "--pasos": 17, "--tiempo": "1.5s" }}
            >
              A CADA UNO DE TUS
            </h2>
          )}

          {paso >= 4 && (
            <h1
              className={`
                insisto-texto-cierre
                insisto-fantasmas-aparece
                ${paso >= 5 ? "insisto-desaparecer" : ""}
              `}
            >
              FANTASMAS.
            </h1>
          )}
        </div>
      </div>

      <div className="insisto-residuos" aria-hidden="true">
        <span>k</span>
        <span>?</span>
        <span>#</span>
        <span>-</span>
        <span>s</span>
        <span>n</span>
        <span>0</span>
        <span>k</span>
        <span>&gt;</span>
        <span>7</span>
        <span>%</span>
        <span>{`{`}</span>
        <span>i</span>
        <span>s</span>
        <span>:</span>
        <span>n</span>
      </div>
    </section>
  );
}