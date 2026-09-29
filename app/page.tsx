import Hero from "@/components/hero/Hero";
import Marquee from "@/components/sections/Marquee";
import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import SentinelTeaser from "@/components/sections/SentinelTeaser";
import Exploring from "@/components/sections/Exploring";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

const MARQUEE_ITEMS = [
  "AI",
  "CYBERSECURITY",
  "SOFTWARE",
  "INTELLIGENT SYSTEMS",
  "SECURITY BY DESIGN",
  "SYSTEMS THINKING",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <AboutSection />
      <ExpertiseSection />
      <SelectedWorkSection />
      <SentinelTeaser />
      <Exploring />
      <ContactSection />
      <Footer />
    </>
  );
}