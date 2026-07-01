import { cn } from "@/lib/utils";
import { GradientText } from "@/components/typography/gradient-text";
import { MutedText } from "@/components/typography/muted-text";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
  eyebrowClassName,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={cn(alignClass, className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-medium uppercase tracking-widest text-primary", eyebrowClassName)}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {highlight ? (
          <>
            {title}{" "}
            <GradientText>{highlight}</GradientText>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <MutedText className={cn("mt-4 max-w-2xl text-base", align === "center" && "mx-auto")}>
          {description}
        </MutedText>
      )}
    </div>
  );
}
