import React, { useEffect, useRef } from 'react';

// --- 8-BIT PALETTE CONFIGURATION ---
const THEME_COLORS = [
  '#5016CA', // Deep Purple
  '#7922ED', // Vivid Purple
  '#3666F2', // Bright Blue
  '#FFFFFF', // White (for contrast)
];

// Configuration for "Pixel" movement
const PARTICLE_COUNT_DIVISOR = 6000; 
const CONNECTION_DISTANCE = 100; 
const MOUSE_RADIUS = 200;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  stepTimer: number; // For jerky 8-bit movement
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / PARTICLE_COUNT_DIVISOR);
      particles.current = [];
      for (let i = 0; i < count; i++) {
        // Snap size to nearest 4px for pixel look
        const rawSize = Math.random() * 12 + 4;
        const size = Math.floor(rawSize / 4) * 4; 
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: size,
          color: THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)],
          stepTimer: 0
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Note: We don't draw a background fill here because 
      // body CSS handles the gradient. Canvas is transparent.

      // Optional: Draw a faint pixel grid
      drawPixelGrid(ctx, canvas);

      const pList = particles.current;

      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];

        // 8-BIT MOVEMENT LOGIC:
        // Only update position every few frames to simulate low refresh rate style
        p.stepTimer++;
        if (p.stepTimer > 4) { 
          p.x += p.vx * 4; // Move in jumps
          p.y += p.vy * 4;
          p.stepTimer = 0;
        }

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse Interaction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          // Push pixels away
          p.x -= Math.cos(angle) * force * 2;
          p.y -= Math.sin(angle) * force * 2;
        }

        // DRAW PIXEL (Square)
        ctx.fillStyle = p.color;
        // Snap position to grid of 4 for pixel-perfect look
        const drawX = Math.floor(p.x / 4) * 4;
        const drawY = Math.floor(p.y / 4) * 4;
        
        ctx.fillRect(drawX, drawY, p.size, p.size);

        // Optional: Simple connections
        for (let j = i + 1; j < pList.length; j++) {
          const p2 = pList[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < CONNECTION_DISTANCE) {
            ctx.beginPath();
            // Use your Logo Blue for connections
            ctx.strokeStyle = `rgba(54, 102, 242, ${0.2 - (dist2 / CONNECTION_DISTANCE) * 0.2})`; 
            ctx.lineWidth = 2; // Thicker lines for retro feel
            // Draw stepped lines (Manhattan distance style) instead of straight
            ctx.moveTo(Math.floor(p.x/4)*4 + p.size/2, Math.floor(p.y/4)*4 + p.size/2);
            ctx.lineTo(Math.floor(p2.x/4)*4 + p2.size/2, Math.floor(p2.y/4)*4 + p2.size/2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const drawPixelGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.fillStyle = 'rgba(80, 22, 202, 0.03)'; // Very faint Deep Purple
      const gridSize = 40;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.fillRect(x, y, 2, 2); // Tiny square dots
        }
      }
    };

    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}