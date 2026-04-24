import { useEffect, useRef } from "react";
import p5 from "p5";
import { sketch } from "../backgrounds/0.PruebaHumo";

export default function PruebaHumo() {
  const contenedorRef = useRef(null);

  useEffect(() => {
    const instancia = new p5(sketch, contenedorRef.current);
    return () => instancia.remove();
  }, []);

  return <section ref={contenedorRef} style={{ width: "100vw", height: "100vh", background: "#000" }} />;
}