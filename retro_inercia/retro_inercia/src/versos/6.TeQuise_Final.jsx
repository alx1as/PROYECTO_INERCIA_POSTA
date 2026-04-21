import { useEffect, useState } from "react";
import "./6.TeQuise_Final.css";

export default function TeQuise_Final({ onFinish }) {
  const [verso, setVerso] = useState(0);

  useEffect(() => {
    const tiempos = [
      1500,  // sé que te quise, incluso, antes de morir
      4000,  // sé que te quise incluso muerta
      6500,  // te quise incluso estando muerta
      8500,  // muerta
      9500,  // muerta queriendo vivía
      12000, // y volviendo a la vida por quererte, moría
      14500, // y quise muerta que mueras en vida
      17000, // e incluso en la vida muerta
      19000, // quise
      21000, // que me quieras.
      24000  // FIN
    ];

    const timers = tiempos.map((t, index) => 
      setTimeout(() => setVerso(index + 1), t)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (verso === 11) {
      onFinish?.();
    }
  }, [verso, onFinish]);

  return (
    <section className="final-wrapper">
      <div className="final-container">
        {verso === 1 && <p className="final-texto">sé que te quise, incluso, antes de morir</p>}
        {verso === 2 && <p className="final-texto">sé que te quise incluso muerta</p>}
        {verso === 3 && <p className="final-texto">te quise incluso estando muerta</p>}
        {verso === 4 && <p className="final-texto final-eco">muerta</p>}
        {verso === 5 && <p className="final-texto">muerta queriendo vivía</p>}
        {verso === 6 && <p className="final-texto">y volviendo a la vida por quererte, moría</p>}
        {verso === 7 && <p className="final-texto">y quise muerta que mueras en vida</p>}
        {verso === 8 && <p className="final-texto">e incluso en la vida muerta</p>}
        {verso === 9 && <p className="final-texto">quise</p>}
        {verso === 10 && <p className="final-texto final-climax">que me quieras.</p>}
      </div>
    </section>
  );
}