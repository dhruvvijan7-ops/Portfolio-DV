import type { Project } from "@/data/projects";

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

export function AbstractProjectVisual({ seed, width = 640, height = 420, label }: { seed: number; width?: number; height?: number; label: string }) {
  const rnd = (i: number) => {
    const s = (seed + i * 1013904223) >>> 0;
    return ((s * 1664525) & 0xffffffff) / 0xffffffff;
  };
  const lines: Array<[number, number]> = Array.from({ length: 8 }, (_, i) => [
    Math.round(rnd(i) * width),
    Math.round(rnd(i + 40) * height),
  ]);
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    x: 40 + rnd(i) * (width - 80),
    y: 40 + rnd(i + 20) * (height - 80),
  }));
  const scanY = 0.62 * height;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={label}>
      <rect width={width} height={height} fill="#1b1e18" />
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={i}
          x1={0}
          y1={(height / 7) * (i + 0.5)}
          x2={width}
          y2={(height / 7) * (i + 0.5)}
          stroke="#38402f"
          strokeOpacity={0.35}
          strokeWidth={0.6}
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={(width / 9) * (i + 0.5)}
          y1={0}
          x2={(width / 9) * (i + 0.5)}
          y2={height}
          stroke="#38402f"
          strokeOpacity={0.3}
          strokeWidth={0.6}
        />
      ))}
      <polyline
        points={lines.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="#6f7c5c"
        strokeOpacity={0.9}
        strokeWidth={1.4}
      />
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={2.2} fill="#a7a89c" fillOpacity={0.85} />
          <circle cx={n.x} cy={n.y} r={6} fill="none" stroke="#6f7c5c" strokeOpacity={0.4} />
        </g>
      ))}
      <line x1={0} y1={scanY} x2={width} y2={scanY} stroke="#e8e6da" strokeOpacity={0.28} strokeWidth={1} />
      <rect x={0} y={scanY - 12} width={width} height={24} fill="#6f7c5c" fillOpacity={0.08} />
      <text x={16} y={height - 16} fontSize={11} fontFamily="ui-monospace, monospace" letterSpacing={2} fill="#a7a89c">
        {label}
      </text>
      <circle cx={width - 22} cy={18} r={3} fill="#6f7c5c" />
    </svg>
  );
}

interface ProjectPreviewProps {
  project: Project;
  index: number;
}

const localCache: Record<string, number> = {};

/** Preview tile — uses the project image when set, otherwise an abstract graphic placeholder. */
export function ProjectPreview({ project, index }: ProjectPreviewProps) {
  const seed = localCache[project.slug] ?? (localCache[project.slug] = hashSlug(project.slug + index));

  if (project.image) {
    return (
      <div className="aspect-[16/11] w-80 overflow-hidden bg-deep">
        {/* eslint-disable-next-line @next/next/no-img-element -- opt-in project imagery */}
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div className="w-72 max-w-[70vw] overflow-hidden border border-hairline md:w-80">
      <AbstractProjectVisual seed={seed} label={project.placeholder ? "PROJECT VISUAL" : "CONCEPT / ARCHITECTURE"} />
    </div>
  );
}