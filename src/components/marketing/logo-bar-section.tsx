import { Container } from "@/components/ui/container";

const communityTypes = [
  "Alumni networks",
  "Universities",
  "Accelerators",
  "Enterprise groups",
  "Venture communities",
  "Leadership circles",
];

export function LogoBarSection() {
  return (
    <section className="border-y border-border bg-surface/50 py-10">
      <Container>
        <p className="mb-8 text-center text-sm font-medium text-text-tertiary">
          Relationship infrastructure for ambitious communities
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {communityTypes.map((community) => (
            <span
              key={community}
              className="text-sm font-medium tracking-tight text-text-secondary/70 transition-colors hover:text-text-secondary"
            >
              {community}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
