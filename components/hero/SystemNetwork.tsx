"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/utils";

interface Node {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: number;
  seed: number;
}

interface Hub {
  x: number;
  y: number;
  r: number;
}

interface Pulse {
  a: Node;
  b: Node;
  t: number;
  speed: number;
}

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NODE_COLOR = "176, 182, 164"; // stone
const LINK_COLOR = "111, 124, 92"; // olive

/**
 * Abstract system visualization: clusters of nodes, faint connections,
 * occasional signal pulses. Nearby nodes respond subtly to the cursor.
 * Deliberately quiet — it sits behind the hero typography.
 */
export default function SystemNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999, active: false };
    let nodes: Node[] = [];
    let hubs: Hub[] = [];
    let edges: Array<[number, number, number]> = [];
    let pulses: Pulse[] = [];
    let running = false;
    let last = performance.now();
    let spawnTimer = 0;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = mulberry32(20260421);
      nodes = [];
      hubs = [];
      edges = [];
      pulses = [];

      const hubCount = 4;
      for (let i = 0; i < hubCount; i++) {
        hubs.push({
          x: w * (0.12 + rand() * 0.76),
          y: h * (0.15 + rand() * 0.7),
          r: 720 + rand() * 420,
        });
      }

      const count = Math.min(115, Math.floor((w * h) / 22000));
      for (let i = 0; i < count; i++) {
        const hub = hubs[Math.floor(rand() * hubs.length)];
        const ang = rand() * Math.PI * 2;
        const rad = Math.sqrt(rand()) * hub.r;
        const hx = hub.x + Math.cos(ang) * rad;
        const hy = hub.y + Math.sin(ang) * rad * 0.8;
        nodes.push({
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          r: 0.6 + rand() * 1.6,
          hub: Math.floor(rand() * hubs.length),
          seed: rand() * Math.PI * 2,
        });
      }

      const threshold = Math.max(120, (w * h) / 16000);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].hx - nodes[j].hx;
          const dy = nodes[i].hy - nodes[j].hy;
          const d2 = dx * dx + dy * dy;
          if (d2 < threshold * threshold) {
            edges.push([i, j, Math.max(0, 1 - Math.sqrt(d2) / threshold)]);
          }
        }
      }
    };

    const readSize = () => {
      const rect = canvas.getBoundingClientRect();
      return [rect.width, rect.height] as const;
    };

    const frame = (time: number) => {
      if (!running) return;
      const dt = Math.min((time - last) / 16.667, 4);
      last = time;
      const [w, h] = readSize();

      // drift
      const t = time * 0.001;
      for (const n of nodes) {
        const driftX = Math.sin(t * 0.22 + n.seed) * 0.18;
        const driftY = Math.cos(t * 0.18 + n.seed * 1.7) * 0.18;
        n.x += (n.hx - n.x) * 0.008 * dt + driftX * dt;
        n.y += (n.hy - n.y) * 0.008 * dt + driftY * dt;
      }

      // cursor influence
      if (pointer.active) {
        const R = 170;
        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.001) {
            const f = (1 - d / R) * 0.35 * dt;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
      }

      ctx.clearRect(0, 0, w, h);

      // edges
      ctx.lineWidth = 0.7;
      for (const [i, j, strength] of edges) {
        const ni = nodes[i];
        const nj = nodes[j];
        const alpha = strength * 0.07 * (1 + Math.sin(t * 0.5 + (i + j) * 0.1) * 0.3);
        ctx.strokeStyle = `rgba(${LINK_COLOR}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.stroke();
      }

      // pulses
      spawnTimer -= dt;
      if (spawnTimer <= 0 && pulses.length < 2) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        if (e) {
          pulses.push({ a: nodes[e[0]], b: nodes[e[1]], t: 0, speed: 0.0035 + Math.random() * 0.004 });
          spawnTimer = 500 + Math.random() * 2400;
        }
      }
      ctx.fillStyle = `rgba(${NODE_COLOR}, 0.5)`;
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pu = pulses[p];
        pu.t += pu.speed * dt;
        if (pu.t >= 1) {
          pulses.splice(p, 1);
          continue;
        }
        const x = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
        const y = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
        const glow = Math.sin(Math.PI * pu.t);
        ctx.fillStyle = `rgba(${NODE_COLOR}, ${0.25 + glow * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + glow * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        const dMouse = pointer.active ? Math.hypot(n.x - pointer.x, n.y - pointer.y) : Infinity;
        const proximity = pointer.active ? 1 - Math.min(dMouse, 320) / 320 : 0;
        const alpha = 0.28 + proximity * 0.45;
        ctx.fillStyle = `rgba(${NODE_COLOR}, ${Math.max(0.12, alpha)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + proximity * 0.9), 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
    };

    const drawStatic = () => {
      const [w, h] = readSize();
      ctx.clearRect(0, 0, w, h);
      for (const [i, j, strength] of edges) {
        ctx.strokeStyle = `rgba(${LINK_COLOR}, ${strength * 0.05})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${NODE_COLOR}, 0.3)`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 }
    );

    const onResize = () => {
      const hadRunning = running;
      stop();
      build();
      if (reduced) drawStatic();
      else if (hadRunning) start();
    };

    build();
    if (reduced) {
      drawStatic();
    } else {
      observer.observe(canvas);
      start();
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}