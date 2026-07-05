import Navbar from "@/components/layout/navbar";
import Hero from "@/components/marketing/hero";
import DashboardPreview from "@/components/marketing/dashboard-preview";
import Features from "@/components/marketing/features";
import About from "@/components/marketing/about";
import AIShowcase from "@/components/marketing/ai-showcase";
import CTA from "@/components/marketing/cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020617] pt-28 lg:pt-24">
      <Navbar /> <div className="h-20 bg-[#020617]"/>
      <Hero />
      <DashboardPreview />
      <Features />
      <About />
      <AIShowcase />
      <CTA />
      <Footer />
    </main>
  );
}