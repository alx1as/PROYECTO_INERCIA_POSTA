import { useEffect, useState } from "react";
import "./3.DescansoOfelia.css";

export default function DescansoOfelia({ onFinish }) {
  const [paso, setPaso] = useState("inicio");

  useEffect(() => {
    const t1 = setTimeout(() => setPaso("descanso"), 1000);
    const t2 = setTimeout(() => setPaso("como-ofelia"), 2500);

    const t3 = setTimeout(() => setPaso("imagen-ofelia"), 4500);

    const t4 = setTimeout(() => setPaso("tumba-invisible"), 8500);

    const t5 = setTimeout(() => setPaso("imagen-rio"), 12500);
    const t6 = setTimeout(() => setPaso("murmuro"), 14500);
    const t7 = setTimeout(() => setPaso("canto"), 16000);
    const t8 = setTimeout(() => setPaso("grito"), 17600);

    const t9 = setTimeout(() => setPaso("yano"), 19400);
    const t10 = setTimeout(() => setPaso("fin"), 20800);

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10].forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (paso === "fin") {
      onFinish?.();
    }
  }, [paso, onFinish]);

  const rioVisible =
    paso === "imagen-rio" ||
    paso === "murmuro" ||
    paso === "canto" ||
    paso === "grito";

  return (
    <section className="ofelia-wrapper">
      {(paso === "descanso" || paso === "como-ofelia") && (
        <h2 className="ofelia-subtitulo">
          {paso === "descanso" ? "descanso" : "como Ofelia"}
        </h2>
      )}

      {paso === "imagen-ofelia" && (
        <img
          src="/ofelia.png"
          alt="Pintura de Ofelia"
          className="ofelia-imagen-parpadeo ofelia-imagen-ofelia"
        />
      )}

      {paso === "tumba-invisible" && (
        <h2 className="ofelia-subtitulo">en mi invisible tumba</h2>
      )}

      {rioVisible && (
        <img
          src="/imagen-rio.jpeg"
          alt="Imagen del río"
          className="ofelia-imagen-parpadeo ofelia-imagen-rio"
        />
      )}

      {paso === "murmuro" && (
        <h3 className="ofelia-voz-rio ofelia-murmuro">murmuro</h3>
      )}

      {paso === "canto" && (
        <>
          <h3 className="ofelia-voz-rio ofelia-murmuro ofelia-voz-apagada">
            murmuro
          </h3>
          <h3 className="ofelia-voz-rio ofelia-canto">canto</h3>
        </>
      )}

      {paso === "grito" && (
        <>
          <h3 className="ofelia-voz-rio ofelia-murmuro ofelia-voz-apagada">
            murmuro
          </h3>
          <h3 className="ofelia-voz-rio ofelia-canto ofelia-voz-apagada">
            canto
          </h3>
          <h3 className="ofelia-voz-rio ofelia-grito">GRITO</h3>
        </>
      )}

      {paso === "yano" && (
        <h2 className="ofelia-subtitulo ofelia-subtitulo-final">
          ya no será
        </h2>
      )}
    </section>
  );
}