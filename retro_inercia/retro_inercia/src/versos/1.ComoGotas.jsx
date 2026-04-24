import "./1.ComoGotas.css";
import { useEffect, useState } from "react";


export default function ComoGotas({ onFinish }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 800);
    const t2 = setTimeout(() => onFinish?.(), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <section className="gotas">
      <p>como gotas atrapadas</p>
      <p>atrapadas</p>
      <p>en un estanque</p>
      <p>de renacuajos</p>
    </section>
  );
}
