import { Heading, Subheading } from "@/components/typography";
import { cn } from "@/lib/utils";

interface AppPageProps {
  title: string;
  description: string;
  className?: string;
}

export function AppPage({ title, description, className }: AppPageProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Heading as="h1" size="md">
        {title}
      </Heading>
      <Subheading className="mt-3 text-base">{description}</Subheading>
    </div>
  );
}
