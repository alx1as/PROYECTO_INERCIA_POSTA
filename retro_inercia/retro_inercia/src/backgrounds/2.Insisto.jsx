export const sketch = (p5) => {
  let particulas = [];
  let nivelDensidad = 0;

  const MAX_PARTICULAS = 260;
  const CARACTERES = "{insisto insisto ja kpptn kdknsfjk ahotjgsnf}[]();:,.<>/?!|&#@$%-+=_*~0123456789".split("");

  const PALETA = [
    [70, 90, 105],    // gris azulado
    [110, 255, 170],  // verde ácido suave
    [220, 245, 120],  // amarillo enfermo
    [120, 145, 165],  // acero apagado
  ];

  const crearParticula = (tipo = "normal") => {
    const baseY = p5.random(p5.height * 0.82, p5.height + 120);

    return {
      x: p5.random(p5.width),
      y: baseY,
      tipo,
      velocidadY: tipo === "grande" ? p5.random(-0.18, -0.35) : p5.random(-0.25, -0.65),
      velocidadX: p5.random(-0.08, 0.08),
      caracter: p5.random(CARACTERES),
      opacidad: tipo === "grande" ? p5.random(18, 40) : p5.random(35, 95),
      ruidoMovimiento: p5.random(1000),
      amplitudX: tipo === "grande" ? p5.random(0.4, 1.2) : p5.random(0.8, 2.2),
      tamano: tipo === "grande" ? p5.random(72, 120) : p5.random(14, 42),
      color: p5.random(PALETA),
      vida: p5.random(220, 520),
      mutacion: tipo === "grande" ? 0.003 : 0.012,
      jitter: p5.random(1) < 0.18, // algunas vibran raro
    };
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textFont("monospace");
    p5.noStroke();
    p5.drawingContext.shadowBlur = 0;
  };

  p5.draw = () => {
    p5.clear();

    const contenedor = p5.select(".insisto-wrapper");
    const esTimida = contenedor ? contenedor.hasClass("insisto-fase-timida") : false;
    const esDensa = contenedor ? contenedor.hasClass("insisto-fase-densa") : false;
    const esEtapaFinal = contenedor ? contenedor.hasClass("insisto-fase-final") : false;

    let nacimientosNormales = 0;
    let nacimientosGrandes = 0;

    if (esTimida) {
      nacimientosNormales = 1;
      if (p5.random() < 0.08) nacimientosGrandes = 1;
    }

    if (esDensa) {
      if (nivelDensidad < 3.2) {
        nivelDensidad += 0.015;
      }

      nacimientosNormales = p5.floor(nivelDensidad);
      if (p5.random() < nivelDensidad * 0.22) nacimientosNormales += 1;
      if (p5.random() < 0.12) nacimientosGrandes = 1;
    }

    for (let i = 0; i < nacimientosNormales; i++) {
      if (particulas.length < MAX_PARTICULAS) {
        particulas.push(crearParticula("normal"));
      }
    }

    for (let i = 0; i < nacimientosGrandes; i++) {
      if (particulas.length < MAX_PARTICULAS) {
        particulas.push(crearParticula("grande"));
      }
    }

    for (let i = particulas.length - 1; i >= 0; i--) {
      const p = particulas[i];

      const ondulacionX = p5.map(
        p5.noise(p.ruidoMovimiento, p5.frameCount * 0.003),
        0,
        1,
        -1,
        1
      );

      p.x += ondulacionX * p.amplitudX + p.velocidadX;
      p.y += p.velocidadY;
      p.ruidoMovimiento += 0.008;
      p.vida -= 1;

      // pequeños errores secos
      if (p.jitter && p5.random() < 0.025) {
        p.x += p5.random(-2.2, 2.2);
      }

      // mutación de carácter
      if (p5.random() < p.mutacion || (esDensa && p5.random() < 0.01)) {
        p.caracter = p5.random(CARACTERES);
      }

      // deriva cromática mínima en fase densa
      if (esDensa && p5.random() < 0.004) {
        p.color = p5.random(PALETA);
      }

      if (esEtapaFinal) {
        p.opacidad -= p.tipo === "grande" ? 0.35 : 1.2;
      } else {
        p.opacidad -= p.tipo === "grande" ? 0.03 : 0.08;
      }

      const colorBase = p5.color(...p.color);
      colorBase.setAlpha(p.opacidad);
      p5.fill(colorBase);

      // una sombra muy tenue para que no quede tan seco
      if (p.tipo === "normal") {
        p5.drawingContext.shadowBlur = 8;
        p5.drawingContext.shadowColor = "rgba(120,255,190,0.08)";
      } else {
        p5.drawingContext.shadowBlur = 0;
      }

      p5.textSize(p.tamano);
      p5.text(p.caracter, p.x, p.y);

      const fueraDePantalla =
        p.y < -140 || p.x < -120 || p.x > p5.width + 120;

      const muerta = p.opacidad <= 0 || p.vida <= 0;

      if (fueraDePantalla || muerta) {
        particulas.splice(i, 1);
      }
    }

    p5.drawingContext.shadowBlur = 0;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};