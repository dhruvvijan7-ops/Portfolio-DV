interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
}

/** Slow, quiet editorial marquee band. Decorative only. */
export default function Marquee({ items, className, speed = 60 }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`overflow-hidden bg-ink py-6${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {doubled.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className={`px-8 text-display whitespace-nowrap uppercase ${
                  i % 2 === 0 ? "text-paper/10" : "text-olive/25"
                }`}
                style={{ WebkitTextStroke: i % 2 === 1 ? "1px rgba(111,124,92,0.35)" : undefined }}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}