import { expertise } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function ExpertiseSection() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-[1920px] px-6 py-28 md:px-10 md:py-44">
        <SectionLabel index="02" label="EXPERTISE" />

        <Reveal className="mt-14 md:mt-24">
          <h2 className="sr-only">Expertise</h2>
          <ul>
            {expertise.map((item) => (
              <li
                key={item.id}
                className="group hairline-t relative grid cursor-default grid-cols-1 gap-3 py-8 transition-colors duration-500 hover:bg-deep md:grid-cols-12 md:items-center md:gap-6 md:py-10"
              >
                <span className="absolute left-0 top-0 h-0 w-px bg-olive transition-all duration-500 group-hover:h-full" />
                <span className="text-micro col-span-1 text-olive md:pl-6">{item.id}</span>
                <h3 className="text-display col-span-1 tracking-[-0.04em] md:col-span-6 md:pl-4 md:transition-transform md:duration-500 md:group-hover:translate-x-3">
                  {item.title}
                </h3>
                <p className="text-body col-span-1 max-w-md text-stone opacity-100 md:col-span-5 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                  {item.description}
                </p>
              </li>
            ))}
            <li className="hairline-b" />
          </ul>
        </Reveal>
      </div>
    </section>
  );
}