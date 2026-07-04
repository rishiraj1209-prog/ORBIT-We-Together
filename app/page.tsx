import Navbar from "@/components/layout/navbar";
import Hero from "@/components/marketing/hero";
import DashboardPreview from "@/components/marketing/dashboard-preview";
import Features from "@/components/marketing/features";
import AIShowcase from "@/components/marketing/ai-showcase";
import CTA from "@/components/marketing/cta";
import Footer from "@/components/layout/footer";
import About from "@/components/marketing/about";
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <About/>
      <AIShowcase />
      <CTA />
      <Footer />
    </main>
  );
}