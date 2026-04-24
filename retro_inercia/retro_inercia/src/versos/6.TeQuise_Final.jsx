import { useEffect, useMemo, useState } from "react";
import "./6.TeQuise_Final.css";

export default function TeQuise_Final({ onFinish }) {
  const [paso, setPaso] = useState(-1);

  const secuencia = useMemo(
    () => [
      {
        tiempo: 600,
        clase: "final-lento",
        lineas: ["SÉ QUE TE QUISE", "Incluso, antes de morir"],
      },
      {
        tiempo: 3200,
        clase: "final-corte",
        lineas: ["SÉ QUE TE QUISE", "INCLUSO MUERTA"],
      },
      {
        tiempo: 5200,
        clase: "final-corte",
        lineas: ["TE QUISE", "INCLUSO ESTANDO MUERTA"],
      },
      {
        tiempo: 6800,
        clase: "final-eco",
        lineas: ["MUERTA"],
      },
      {
        tiempo: 7600,
        clase: "final-rafaga",
        lineas: ["MUERTA", "QUERIENDO", "VIVÍA"],
      },
      {
        tiempo: 9800,
        clase: "final-latido",
        lineas: ["Y VOLVIENDO A LA VIDA", "POR QUERERTE,", "MORÍA"],
      },
      {
        tiempo: 12400,
        clase: "final-filoso",
        lineas: ["Y QUISE MUERTA", "QUE MUERAS EN VIDA"],
      },
      {
        tiempo: 14800,
        clase: "final-corte",
        lineas: ["E INCLUSO", "EN LA VIDA MUERTA"],
      },
      {
        tiempo: 16800,
        clase: "final-quise",
        lineas: ["QUISE"],
      },
      {
        tiempo: 18400,
        clase: "final-climax",
        lineas: ["QUE ME QUIERAS."],
      },
      {
      tiempo: 21000,
      clase: "final-silencio",
      lineas: [],
    },
    ],
    []
  );

  useEffect(() => {
    const timers = secuencia.map((item, index) =>
      setTimeout(() => setPaso(index), item.tiempo)
    );

    const final = setTimeout(() => {
  onFinish?.();
}, 26000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(final);
    };
  }, [secuencia, onFinish]);

  const actual = paso >= 0 ? secuencia[paso] : null;

  return (
    <section className={`final-wrapper ${actual ? actual.clase : ""}`}>
      <div className="final-electricidad" />

      {actual && (
        <div className="final-container" key={paso}>
          <div
            className={`final-texto ${actual.clase}`}
            data-text={actual.lineas.join(" ")}
          >
            {actual.lineas.map((linea, lineaIndex) => (
              <p className="final-linea" key={lineaIndex}>
                {linea.split(" ").map((palabra, palabraIndex) => (
                  <span
                    key={palabraIndex}
                    style={{ "--i": palabraIndex }}
                  >
                    {palabra}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}