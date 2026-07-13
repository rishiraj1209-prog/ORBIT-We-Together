import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/constants/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Container size="narrow" className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-text-secondary">
          This page doesn&apos;t exist or hasn&apos;t been built yet. Auth and
          app routes arrive in upcoming phases.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button>
            <ArrowLeft className="h-4 w-4" />
            Back to {SITE.name}
          </Button>
        </Link>
      </Container>
    </div>
  );
}
