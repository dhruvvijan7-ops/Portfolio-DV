import { exploring } from "@/data/site";

export default function Exploring() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-[1920px] px-6 py-14 md:px-10">
        <div className="hairline-t flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <span className="text-micro shrink-0 text-olive">NOW / EXPLORING</span>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {exploring.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.14em] text-stone">{item}</span>
                {i < exploring.length - 1 && (
                  <span className="text-olive/60" aria-hidden="true">
                    ↦
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}