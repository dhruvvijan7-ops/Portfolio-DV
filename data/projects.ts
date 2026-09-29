/**
 * Project data.
 *
 * Source of truth for the work archive + case studies.
 * Replace placeholder entries as real work is added —
 * nothing in here is invented.
 */

export type ProjectStatus = "IMPLEMENTED" | "ROADMAP" | "RESEARCH" | "PLACEHOLDER";

export interface CaseSection {
  heading: string;
  body: string[];
}

export interface Project {
  title: string;
  slug: string;
  alias?: string;
  category: string;
  year: string;
  status: ProjectStatus;
  statusNote?: string;
  description: string;
  role: string;
  technologies: string[];
  image?: string;
  placeholder: boolean;
  links?: { label: string; href: string }[];
  caseStudy?: CaseSection[];
}

export const projects: Project[] = [
  {
    title: "SENTINEL",
    alias: "SENTINELAI / LIGHT-HIDS",
    slug: "sentinel",
    category: "AI × CYBERSECURITY",
    year: "IN PROGRESS",
    status: "RESEARCH",
    statusNote:
      "Concept and early implementation. Not a production system. No live data, no real-time claims.",
    description:
      "A lightweight endpoint / host security platform. Sentinel observes host behaviour, normalizes telemetry, and explains what it finds. Built around a single pipeline: OBSERVE → COLLECT → NORMALIZE → ANALYZE → DETECT → EXPLAIN.",
    role: "IDEATION · DESIGN · IMPLEMENTATION",
    technologies: [
      "HOST INSTRUMENTATION",
      "TELEMETRY",
      "PYTHON",
      "BEHAVIORAL ANALYSIS",
      "RULES",
      "EXPLAINABILITY",
    ],
    placeholder: false,
    links: [
      { label: "CASE STUDY", href: "/work/sentinel" },
      { label: "GITHUB · [REPO]", href: "#" },
    ],
    caseStudy: [
      {
        heading: "PROBLEM",
        body: [
          "Most endpoint security tools are heavy, opaque, and expensive to operate. They generate alert piles instead of explanations, and they are miserable to run on hardware that is not a cloud server.",
          "[Expand with your own framing of the problem as it develops.]",
        ],
      },
      {
        heading: "WHY IT MATTERS",
        body: [
          "Security only works when the humans involved can actually understand what the machine is telling them. A lightweight platform that explains its own conclusions lowers the cost of good security.",
          "[Add context — environment, motivation, constraints.]",
        ],
      },
      {
        heading: "CONCEPT",
        body: [
          "Sentinel treats a host as a system under observation. It collects behavioural signals, normalizes them into a consistent stream, and runs them through an analysis layer that separates the expected from the unexpected.",
        ],
      },
      {
        heading: "ARCHITECTURE",
        body: [
          "Core pipeline: OBSERVE → COLLECT → NORMALIZE → ANALYZE → DETECT → EXPLAIN.",
          "Each stage owns one responsibility. Output of one stage is the input of the next. The design keeps instrumentation decoupled from analysis so the platform can grow without becoming a monolith.",
        ],
      },
      {
        heading: "WORKFLOW",
        body: [
          "Telemetry is collected from host sources, normalized into a single event structure, and analysed. When something deviates from expected behaviour it moves to detection. Every detection is paired with an explanation — the context that lets a human judge it quickly.",
          "[Document the actual workflow as implemented.]",
        ],
      },
      {
        heading: "IMPLEMENTATION",
        body: [
          "Early implementation in progress. Instrumentation and normalization are the current focus. Detection logic is rule-based for now; ML-assisted ranking is a research direction, not a shipped feature.",
          "[Be explicit about what EXISTS vs what is NEXT.]",
        ],
      },
      {
        heading: "DETECTION APPROACH",
        body: [
          "Behavioural baselining: define what a host normally does, then investigate the edges. Signals around process behaviour, resource usage, and persistence receive the most attention.",
          "[Clarify current capability honestly.]",
        ],
      },
      {
        heading: "EVIDENCE & EXPLAINABILITY",
        body: [
          "Every finding carries evidence: the signals involved, why they matter, and the reasoning that connected them. The goal is that no alert is a dead end.",
        ],
      },
      {
        heading: "CHALLENGES",
        body: [
          "Keeping the footprint light while collecting enough signal. Avoiding alert fatigue. Making explanations genuinely useful instead of decorative.",
          "[Add real challenges as you hit them.]",
        ],
      },
      {
        heading: "CURRENT STATUS",
        body: [
          "In development. Status labels — IMPLEMENTED / ROADMAP / RESEARCH — will be applied to each capability as the build progresses.",
        ],
      },
      {
        heading: "ROADMAP",
        body: [
          "Telemetry → normalization → rule detection → explainability. Then: persistence, aggregation, and a careful look at ML-assisted ranking.",
        ],
      },
      {
        heading: "LESSONS",
        body: [
          "[Written as the build proceeds.] Simple first, clever later. Explain everything.",
        ],
      },
    ],
  },
  {
    title: "[PROJECT 02]",
    slug: "project-02",
    category: "[CATEGORY]",
    year: "[YEAR]",
    status: "PLACEHOLDER",
    statusNote: "Editable placeholder — replace with a real project.",
    description:
      "[Short description of what this project does, why it exists, and what it taught you.]",
    role: "[ROLE]",
    technologies: ["[TECH 1]", "[TECH 2]", "[TECH 3]"],
    placeholder: true,
    links: [{ label: "[GITHUB]", href: "#" }],
  },
  {
    title: "[PROJECT 03]",
    slug: "project-03",
    category: "[CATEGORY]",
    year: "[YEAR]",
    status: "PLACEHOLDER",
    statusNote: "Editable placeholder — replace with a real project.",
    description:
      "[Short description of what this project does, why it exists, and what it taught you.]",
    role: "[ROLE]",
    technologies: ["[TECH 1]", "[TECH 2]", "[TECH 3]"],
    placeholder: true,
    links: [{ label: "[GITHUB]", href: "#" }],
  },
];

export const sentinelPipeline = [
  { id: "01", label: "OBSERVE" },
  { id: "02", label: "COLLECT" },
  { id: "03", label: "NORMALIZE" },
  { id: "04", label: "ANALYZE" },
  { id: "05", label: "DETECT" },
  { id: "06", label: "EXPLAIN" },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}