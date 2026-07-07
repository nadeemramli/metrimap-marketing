import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/** Standard interior-page hero: eyebrow + h1 + lede on a subtle band. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="border-b border-border bg-muted/30">
      <Section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Container>
      </Section>
    </div>
  );
}
