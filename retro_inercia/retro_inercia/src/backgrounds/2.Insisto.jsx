export const sketch = (p5) => {
  let particulas = [];
  let nivelDensidad = 0;
  // Límite óptimo para evitar caídas de fotogramas en el navegador
  const MAX_PARTICULAS = 350; 
  const CARACTERES = "{insisto insisto ja kpptn kdknsfjk ahotjgsnf}[]();:,.<>/?!|&#@$%-+=_*~0123456789".split("");

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textFont('monospace');
    p5.noStroke();
    p5.drawingContext.shadowBlur = 0; 
  };

  p5.draw = () => {
    p5.clear(); // color de fondo viene de css

    const contenedor = p5.select('.insisto-wrapper');
    const esTimida = contenedor ? contenedor.hasClass('insisto-fase-timida') : false;
    const esDensa = contenedor ? contenedor.hasClass('insisto-fase-densa') : false;
    const esEtapaFinal = contenedor ? contenedor.hasClass('insisto-fase-final') : false;

    let probNacimiento = 0; 
    
    if (esTimida) {
      probNacimiento = 0.2; 
    } else if (esDensa) {
      // Crecimiento sostenido para que la invasión sea fluida y no colapse
      if (nivelDensidad < 5) {
        nivelDensidad += 0.02; 
      }
      probNacimiento = nivelDensidad;
    }

    let cantidadANacer = Math.floor(probNacimiento);
    if (p5.random(1) < (probNacimiento - cantidadANacer)) {
      cantidadANacer++; 
    }

    for (let j = 0; j < cantidadANacer; j++) {
      if (particulas.length < MAX_PARTICULAS) {
        particulas.push({
          x: p5.random(p5.width),
          y: p5.height + p5.random(20, 150), 
          // Velocidades más lentas para dar la sensación de levitación
          velocidadY: p5.random(-0.5, -0.8), 
          caracter: p5.random(CARACTERES),
          opacidad: p5.random(80, 200), 
          ruidoMovimiento: p5.random(1000), 
          // Controla qué tanto se mueven a los lados
          amplitudX: p5.random(1.5, 0.5), 
          tamano: p5.random(85, 10), 

        });
      }
    }

    for (let i = particulas.length - 1; i >= 0; i--) {
      let particula = particulas[i];
      
      // Ondulación orgánica: se mueven como espíritus o cenizas
      let ondulacionX = p5.map(p5.noise(particula.ruidoMovimiento, p5.frameCount * 0.002), 0, 1, -1, 1);
      
      particula.x += ondulacionX * particula.amplitudX;
      particula.y += particula.velocidadY;
      particula.ruidoMovimiento += 0.01;
      
      // Mutación aleatoria
      if (p5.random(1) < 0.01) {
        particula.caracter = p5.random(CARACTERES);
      }

      if (esEtapaFinal) {
        // Se apagan manteniendo su inercia natural
        particula.opacidad -= 1.5; 
      } else {
        let distanciaRaton = p5.dist(p5.mouseX, p5.mouseY, particula.x, particula.y);
        if (distanciaRaton < 120) {
          particula.opacidad = 255; 
        } else {
          particula.opacidad -= 0.02; 
        }
      }

      // Estilos visuales condicionales
      let colorBase = esEtapaFinal ? p5.color(150) : p5.color("#2c363f"); //color de los caracteres ahora en un azul apagado 

      colorBase.setAlpha(particula.opacidad);
      p5.fill(colorBase);

      p5.textSize(particula.tamano);
      p5.text(particula.caracter, particula.x, particula.y);

      if (particula.y < -50 || particula.opacidad <= 0) {
        particulas.splice(i, 1);
      }
    }
  };

  p5.windowResized = () => p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
};