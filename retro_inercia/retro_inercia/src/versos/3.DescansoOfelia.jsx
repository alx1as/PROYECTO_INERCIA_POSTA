import { useEffect, useState } from "react";
import "./3.DescansoOfelia.css";

export default function DescansoOfelia({ onFinish }) {
  const [paso, setPaso] = useState("inicio");

  useEffect(() => {
    // 1. Títulos iniciales
    const t1 = setTimeout(() => setPaso("descanso"), 1000);
    const t2 = setTimeout(() => setPaso("como-ofelia"), 2500);

    // 2. Imagen Ofelia con parpadeo
    const t3 = setTimeout(() => setPaso("imagen-ofelia"), 4500);

    // 3. Nuevos versos (Transición de la tumba)
    const t4 = setTimeout(() => setPaso("tumba-invisible"), 8500);
    const t5 = setTimeout(() => setPaso("lleno-renacuajos"), 10500);
    
    // 4. Nueva imagen del río (Acá podés cambiar el src cuando la tengas)
    const t6 = setTimeout(() => setPaso("imagen-rio"), 12500);

    // 5. El crescendo final
    const t7 = setTimeout(() => setPaso("murmuro"), 15500);
    const t8 = setTimeout(() => setPaso("canto"), 17000);
    const t9 = setTimeout(() => setPaso("grito"), 18500);
    const t10 = setTimeout(() => setPaso("yano"), 20000);
    
    // Cierre
    const t11 = setTimeout(() => setPaso("fin"), 21000); 

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10].forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (paso === "fin") {
      onFinish?.();
    }
  }, [paso, onFinish]);

  return (
    <section className="ofelia-wrapper">
      
      {/* Títulos iniciales */}
      {paso === "descanso" && <h2 className="ofelia-subtitulo">descanso</h2>}
      {paso === "como-ofelia" && <h2 className="ofelia-subtitulo">como Ofelia</h2>}

      {/* Imagen Ofelia: El CSS manejará el parpadeo de proyector */}
      {paso === "imagen-ofelia" && (
        <img 
          src="/ofelia.jpg" 
          alt="Pintura de Ofelia" 
          className="ofelia-imagen-parpadeo" 
        />
      )}

      {/* Versos intermedios */}
      {paso === "tumba-invisible" && <h2 className="ofelia-subtitulo">en mi invisible tumba</h2>}
      {paso === "lleno-renacuajos" && <h2 className="ofelia-subtitulo">lleno de renacuajos</h2>}

      {/* Nueva imagen del río */}
      {paso === "imagen-rio" && (
        <img 
          src="/imagen-rio.jpeg" 
          alt="Imagen del río" 
          className="ofelia-imagen-parpadeo" 
        />
      )}

      {/* Bloque de voz final */}
      {paso === "murmuro" && <h3 className="ofelia-voz-central ofelia-murmuro">MURMURO</h3>}
      {paso === "canto" && <h3 className="ofelia-voz-central ofelia-canto">CANTO</h3>}
      {paso === "grito" && <h3 className="ofelia-voz-central ofelia-grito">GRITO</h3>}
       {paso === "yano" && <h3 className="ofelia-voz-central ofelia-grito">ya no será</h3>}

    </section>
  );
}