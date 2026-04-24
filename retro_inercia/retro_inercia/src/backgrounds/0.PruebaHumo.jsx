export const sketch = (p5) => {
  let video;
  let listo = false;
  let congelado = false;
  let tiempoCongelado = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    video = p5.createVideo("/humo.mp4", () => {
      listo = true;
      video.volume(0);
      video.hide();
      video.play();
    });
  };

  p5.draw = () => {
    if (!listo) {
      p5.background(0);
      return;
    }

    p5.noStroke();
    p5.fill(0, 28);
    p5.rect(0, 0, p5.width, p5.height);

    const dur = video.duration() || 0;
    const t = video.time() || 0;

    if (!congelado && dur > 0 && t >= dur - 0.18) {
      congelado = true;
      tiempoCongelado = p5.millis();
      video.pause();
    }

    const vw = video.width || 720;
    const vh = video.height || 1280;

    const escala = Math.min(p5.width / vw, p5.height / vh);
    const dw = vw * escala;
    const dh = vh * escala;
    const dx = (p5.width - dw) / 2;
    const dy = (p5.height - dh) / 2;

    p5.push();
    p5.tint(210, 225, 235, 235);
    p5.image(video, dx, dy, dw, dh);
    p5.pop();

    const ctx = p5.drawingContext;
    ctx.save();
    const grad = ctx.createRadialGradient(
      p5.width / 2,
      p5.height / 2,
      p5.width * 0.12,
      p5.width / 2,
      p5.height / 2,
      p5.width * 0.7
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.42)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, p5.width, p5.height);
    ctx.restore();

    if (congelado && p5.millis() - tiempoCongelado > 1800) {
      p5.noLoop();
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};