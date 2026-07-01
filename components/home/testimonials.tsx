"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { GlassCard } from "@/components/common/glass-card";
import { SectionWrapper, MaxWidth } from "@/components/layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TESTIMONIALS } from "@/lib/constants/home";

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <GlassCard hover={false} className="w-[340px] shrink-0 p-6">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-warning text-warning" />
        ))}
      </div>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <SectionWrapper className="overflow-hidden">
      <MaxWidth>
        <ScrollReveal className="mb-12">
          <SectionTitle eyebrow="Testimonials" title="Loved by schools across India" />
        </ScrollReveal>
      </MaxWidth>

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 px-6"
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
