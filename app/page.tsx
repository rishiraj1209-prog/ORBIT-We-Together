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
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <DashboardPreview />
        <Features />
        <About />
        <AIShowcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
