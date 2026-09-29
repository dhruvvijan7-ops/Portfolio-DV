/**
 * Central site configuration.
 * Everything here is meant to be edited directly.
 */

export const site = {
  name: "DHRUV",
  identity: "AI × CYBERSECURITY × SOFTWARE",
  role: "AI / Cybersecurity / Software",
  /** Editable tagline shown in the hero statement block. */
  statement:
    "I build intelligent digital systems — software engineered with security in mind, and systems that reason over data to detect, explain, and act.",
  indexLabel: "SYSTEM / INDEX",
  meta: {
    title: "Dhruv — AI × Cybersecurity × Software",
    description:
      "Dhruv builds intelligent digital systems at the intersection of AI, cybersecurity, and software engineering.",
  },
  contact: {
    /** Editable contact endpoints. Keep mailto empty to hide the row. */
    email: "hello@dhruv.dev",
    github: "@[GITHUB]",
    linkedin: "@[LINKEDIN]",
    emailHref: "#", // set to "mailto:you@domain.com"
    githubHref: "#", // set to "https://github.com/..."
    linkedinHref: "#", // set to "https://linkedin.com/in/..."
  },
  builtWith: ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "GSAP", "LENIS"],
} as const;

export const navLinks = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const expertise = [
  {
    id: "01",
    title: "AI / MACHINE LEARNING",
    description:
      "Applied ML and reasoning pipelines — building models and agents that make decisions from real data.",
    placeholders: "[COURSEWORK · EXPERIMENTS · MODELS]",
  },
  {
    id: "02",
    title: "CYBERSECURITY",
    description:
      "Threat modelling, detection engineering, defensive tooling — security designed in, not bolted on.",
    placeholders: "[HIDS · DETECTION RESEARCH]",
  },
  {
    id: "03",
    title: "SOFTWARE ENGINEERING",
    description:
      "Clean, typed, testable systems. Architecture that survives contact with the real world.",
    placeholders: "[LANGUAGES · FRAMEWORKS · PROJECTS]",
  },
  {
    id: "04",
    title: "SYSTEM DESIGN",
    description:
      "Distributed mental models, data pipelines, reliability — designing systems as systems.",
    placeholders: "[ARCHITECTURE NOTES]",
  },
  {
    id: "05",
    title: "WEB DEVELOPMENT",
    description:
      "Fast, accessible, art-directed interfaces — performance as a feature, not a footnote.",
    placeholders: "[REACT · NEXT.JS · THIS SITE]",
  },
  {
    id: "06",
    title: "AUTOMATION",
    description:
      "Removing the boring loops — scripts, tooling, and pipelines that do the work once and again.",
    placeholders: "[TOOLING · SCRIPTS]",
  },
] as const;

export const exploring = [
  "AI AGENTS",
  "SECURITY AUTOMATION",
  "BEHAVIORAL ANALYSIS",
  "ANOMALY DETECTION",
  "SYSTEMS / INFRA",
  "INTERACTIVE SYSTEMS",
] as const;

/** About copy — expand or replace freely. Nothing fabricated. */
export const about = {
  intro: "I BUILD SYSTEMS THAT THINK.",
  body: [
    "I work at the intersection of AI, cybersecurity, and software. Most of my energy goes toward one problem: building systems that observe, reason, and respond — quietly, precisely, behind the scenes.",
    "That means security engineers who think like builders, machine learning applied to real problems rather than demos, and software that treats safety and clarity as default behaviour.",
  ],
  principles: [
    { label: "SYSTEMS THINKING" },
    { label: "SECURITY BY DESIGN" },
    { label: "EXPERIMENTATION" },
    { label: "CLARITY OVER COMPLEXITY" },
  ],
} as const;