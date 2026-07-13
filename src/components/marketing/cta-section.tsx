import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/constants/site";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-subtle)_0%,_transparent_70%)]"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {SITE.tagline}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Join thousands of verified alumni and students building the
              network your college always deserved.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Log in to Orbit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
