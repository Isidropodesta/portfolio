'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const TECHS = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Python', color: '#f7c948' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'HTML', color: '#e34c26' },
  { name: 'CSS', color: '#3b9eff' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Git', color: '#f05032' },
  { name: 'Linux', color: '#c8d8ec' },
  { name: 'Express', color: '#c8d8ec' },
];

type Point3D = [number, number, number];
type TechItem = {
  name: string;
  color: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
};

function fibonacciSphere(n: number): Point3D[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    return [Math.cos(theta) * r, y, Math.sin(theta) * r] as Point3D;
  });
}

function rotate([x, y, z]: Point3D, ax: number, ay: number): Point3D {
  // Rotate around X
  const cosX = Math.cos(ax), sinX = Math.sin(ax);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;
  // Rotate around Y
  const cosY = Math.cos(ay), sinY = Math.sin(ay);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;
  return [x2, y1, z2];
}

const BASE = fibonacciSphere(TECHS.length);
const RADIUS = 155;
const SIZE = 380;
const PERSP = RADIUS * 3.5;

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef({ ax: 0.25, ay: 0 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const rafRef = useRef<number>(0);
  const [items, setItems] = useState<TechItem[]>([]);

  const drawSphere = useCallback((ctx: CanvasRenderingContext2D, ax: number, ay: number) => {
    ctx.clearRect(0, 0, SIZE, SIZE);
    const cx = SIZE / 2, cy = SIZE / 2;
    ctx.strokeStyle = 'rgba(59,158,255,0.11)';
    ctx.lineWidth = 0.7;

    // Latitude circles
    for (let lat = -60; lat <= 60; lat += 30) {
      const latR = RADIUS * Math.cos((lat * Math.PI) / 180);
      const latY = RADIUS * Math.sin((lat * Math.PI) / 180);
      ctx.beginPath();
      let first = true;
      for (let lng = 0; lng <= 362; lng += 4) {
        const lngR = (lng * Math.PI) / 180;
        const [rx, ry, rz] = rotate([latR * Math.cos(lngR), latY, latR * Math.sin(lngR)], ax, ay);
        const p = PERSP / (PERSP - rz);
        const px = cx + rx * p, py = cy + ry * p;
        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        first = false;
      }
      ctx.stroke();
    }

    // Longitude arcs
    for (let lng = 0; lng < 180; lng += 30) {
      const lngR = (lng * Math.PI) / 180;
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 92; lat += 4) {
        const latRad = (lat * Math.PI) / 180;
        const latR2 = RADIUS * Math.cos(latRad);
        const [rx, ry, rz] = rotate([latR2 * Math.cos(lngR), RADIUS * Math.sin(latRad), latR2 * Math.sin(lngR)], ax, ay);
        const p = PERSP / (PERSP - rz);
        const px = cx + rx * p, py = cy + ry * p;
        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        first = false;
      }
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function tick() {
      if (!dragRef.current.active) {
        rotRef.current.ay += 0.004;
      }
      const { ax, ay } = rotRef.current;
      drawSphere(ctx, ax, ay);

      const newItems: TechItem[] = TECHS.map((tech, i) => {
        const base: Point3D = [BASE[i][0] * RADIUS, BASE[i][1] * RADIUS, BASE[i][2] * RADIUS];
        const [rx, ry, rz] = rotate(base, ax, ay);
        const depth = (rz + RADIUS) / (2 * RADIUS); // 0 = back, 1 = front
        return {
          name: tech.name,
          color: tech.color,
          x: rx,
          y: ry,
          z: rz,
          scale: 0.38 + depth * 0.9,
          opacity: 0.08 + depth * 0.92,
        };
      }).sort((a, b) => a.z - b.z);

      setItems(newItems);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawSphere]);

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    rotRef.current.ay += (e.clientX - dragRef.current.lastX) * 0.006;
    rotRef.current.ax += (e.clientY - dragRef.current.lastY) * 0.006;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };
  const stopDrag = () => { dragRef.current.active = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { active: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.active) return;
    rotRef.current.ay += (e.touches[0].clientX - dragRef.current.lastX) * 0.006;
    rotRef.current.ax += (e.touches[0].clientY - dragRef.current.lastY) * 0.006;
    dragRef.current.lastX = e.touches[0].clientX;
    dragRef.current.lastY = e.touches[0].clientY;
  };

  return (
    <section id="habilidades" className="py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            Mis{' '}
            <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm">Arrastrá el globo para explorarlo</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          style={{ width: SIZE, height: SIZE, position: 'relative', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={stopDrag}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59,158,255,0.06) 0%, rgba(123,94,167,0.04) 50%, transparent 70%)',
            }}
          />
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            className="absolute inset-0"
          />
          {items.map((item) => (
            <div
              key={item.name}
              style={{
                position: 'absolute',
                left: SIZE / 2 + item.x,
                top: SIZE / 2 + item.y,
                transform: `translate(-50%, -50%) scale(${item.scale})`,
                opacity: item.opacity,
                color: item.color,
                fontSize: 13,
                fontWeight: 700,
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                textShadow: `0 0 12px ${item.color}50`,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              {item.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
