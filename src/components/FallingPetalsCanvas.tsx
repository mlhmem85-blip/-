import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  color: string;
  opacity: number;
  scaleX: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  fadeSpeed: number;
}

export const FallingPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(225, 29, 72, ',   // rose-600
      'rgba(244, 63, 94, ',   // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(190, 18, 60, ',   // rose-700
      'rgba(244, 114, 182, ', // pink-400
    ];

    const petalCount = Math.min(32, Math.floor(width / 40));
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 14,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.4 + Math.random() * 0.45,
        scaleX: 0.5 + Math.random() * 0.5,
      });
    }

    const starCount = 35;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 1.6,
        alpha: Math.random(),
        fadeSpeed: 0.005 + Math.random() * 0.015,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render starry sparkles
      stars.forEach((star) => {
        star.alpha += star.fadeSpeed;
        if (star.alpha > 0.85 || star.alpha < 0.1) {
          star.fadeSpeed = -star.fadeSpeed;
        }
        ctx.fillStyle = `rgba(255, 230, 200, ${star.alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render rose petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(p.scaleX, 1);

        // Draw organic curved petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, p.size / 2, 0, p.size);
        ctx.bezierCurveTo(p.size / 2, p.size / 2, p.size / 2, -p.size / 2, 0, 0);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 opacity-70 transition-opacity duration-1000"
    />
  );
};
