import { Container } from "@/components/ui/container";

const colleges = [
  "IIT Delhi",
  "BITS Pilani",
  "NIT Trichy",
  "IIIT Hyderabad",
  "DTU",
  "VIT",
];

export function LogoBarSection() {
  return (
    <section className="border-y border-border bg-surface/50 py-10">
      <Container>
        <p className="mb-8 text-center text-sm font-medium text-text-tertiary">
          Trusted by alumni communities at leading institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {colleges.map((college) => (
            <span
              key={college}
              className="text-sm font-medium tracking-tight text-text-secondary/70 transition-colors hover:text-text-secondary"
            >
              {college}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
