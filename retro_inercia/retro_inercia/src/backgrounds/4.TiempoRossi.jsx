export const sketch = (p5) => {
  let polvo = [];
  const MAX_POLVO = 85;

  const PALETA = {
    fondoA: [10, 13, 12],
    fondoB: [16, 20, 18],
    fondoC: [23, 26, 22],
    hueso: [220, 212, 196],
    verde: [72, 88, 74],
    ocre: [92, 82, 66],
    raya: [180, 170, 152],
  };

  const crearParticula = () => ({
    x: p5.random(p5.width),
    y: p5.random(p5.height),
    r: p5.random(1, 3.2),
    vx: p5.random(-0.06, 0.06),
    vy: p5.random(-0.04, 0.04),
    alpha: p5.random(10, 28),
    fase: p5.random(1000),
  });

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();

    for (let i = 0; i < MAX_POLVO; i++) {
      polvo.push(crearParticula());
    }
  };

  function fondoBase() {
    for (let y = 0; y < p5.height; y += 2) {
      const t = y / p5.height;
      const r = p5.lerp(PALETA.fondoA[0], PALETA.fondoC[0], t);
      const g = p5.lerp(PALETA.fondoA[1], PALETA.fondoC[1], t);
      const b = p5.lerp(PALETA.fondoA[2], PALETA.fondoC[2], t);
      p5.fill(r, g, b);
      p5.rect(0, y, p5.width, 2);
    }
  }

  function velosArchivo() {
    p5.drawingContext.save();
    p5.drawingContext.filter = "blur(36px)";

    const t = p5.frameCount * 0.0025;

    p5.fill(PALETA.verde[0], PALETA.verde[1], PALETA.verde[2], 16);
    p5.ellipse(
      p5.width * 0.24 + p5.sin(t * 0.8) * 18,
      p5.height * 0.3,
      p5.width * 0.34,
      p5.height * 0.5
    );

    p5.fill(PALETA.ocre[0], PALETA.ocre[1], PALETA.ocre[2], 10);
    p5.ellipse(
      p5.width * 0.72 + p5.cos(t * 0.7) * 14,
      p5.height * 0.72,
      p5.width * 0.28,
      p5.height * 0.34
    );

    p5.fill(0, 0, 0, 24);
    p5.ellipse(
      p5.width * 0.5,
      p5.height * 0.1 + p5.sin(t * 0.5) * 8,
      p5.width * 0.9,
      p5.height * 0.22
    );

    p5.drawingContext.restore();
  }

  function bandasFilm() {
    for (let y = 0; y < p5.height; y += 32) {
      const n = p5.noise(y * 0.01, p5.frameCount * 0.01);
      const alpha = p5.map(n, 0, 1, 3, 10);
      p5.fill(PALETA.raya[0], PALETA.raya[1], PALETA.raya[2], alpha);
      p5.rect(0, y, p5.width, 1);
    }
  }

  function rayasVerticales() {
    for (let x = 0; x < p5.width; x += 54) {
      const n = p5.noise(x * 0.004, p5.frameCount * 0.004);
      const alpha = p5.map(n, 0, 1, 2, 7);
      p5.fill(210, 202, 188, alpha);
      p5.rect(x, 0, 1, p5.height);
    }
  }

  function gateWeave() {
    const dx = p5.map(p5.noise(p5.frameCount * 0.015), 0, 1, -1.4, 1.4);
    const dy = p5.map(p5.noise(999 + p5.frameCount * 0.012), 0, 1, -0.8, 0.8);
    p5.translate(dx, dy);
  }

  function dibujarPolvo() {
    polvo.forEach((pt) => {
      pt.x += pt.vx;
      pt.y += pt.vy;

      const pulso = p5.map(
        p5.sin(p5.frameCount * 0.012 + pt.fase),
        -1,
        1,
        0.65,
        1
      );

      if (pt.x < -8) pt.x = p5.width + 8;
      if (pt.x > p5.width + 8) pt.x = -8;
      if (pt.y < -8) pt.y = p5.height + 8;
      if (pt.y > p5.height + 8) pt.y = -8;

      p5.fill(
        PALETA.hueso[0],
        PALETA.hueso[1],
        PALETA.hueso[2],
        pt.alpha * pulso
      );
      p5.circle(pt.x, pt.y, pt.r);
    });
  }

  function quemadoBordes() {
    p5.drawingContext.save();
    const ctx = p5.drawingContext;

    const grad = ctx.createRadialGradient(
      p5.width * 0.5,
      p5.height * 0.5,
      p5.width * 0.18,
      p5.width * 0.5,
      p5.height * 0.5,
      p5.width * 0.72
    );

    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.56)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, p5.width, p5.height);
    p5.drawingContext.restore();
  }

  function flashMecanico() {
    if (p5.frameCount % 240 === 0) {
      p5.fill(255, 248, 230, 8);
      p5.rect(0, 0, p5.width, p5.height);
    }
  }

  p5.draw = () => {
    p5.push();
    gateWeave();

    fondoBase();
    velosArchivo();
    bandasFilm();
    rayasVerticales();
    dibujarPolvo();
    flashMecanico();
    quemadoBordes();

    p5.pop();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};