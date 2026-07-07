import { cn } from "@/lib/utils";
import { Heading } from "@/components/typography";
import { Caption } from "@/components/typography";

interface AuthHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function AuthHeader({ title, description, className }: AuthHeaderProps) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      <Heading as="h1" size="md" className="mb-2">
        {title}
      </Heading>
      <Caption className="text-sm">{description}</Caption>
    </div>
  );
}
