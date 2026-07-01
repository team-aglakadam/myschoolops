"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { FeesWidget } from "@/components/widgets/fees-widget";
import { SectionContainer } from "@/components/layout";

export function FeesPreview() {
  const [collected, setCollected] = useState(72);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const t1 = setInterval(() => setCollected((p) => (p < 89 ? p + 1 : p)), 3000);
    const t2 = setInterval(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    }, 6000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <SectionContainer>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <ScrollReveal delay={0.2} direction="right" className="order-2 lg:order-1">
          <FeesWidget collected={collected} showSuccess={showSuccess} />
        </ScrollReveal>

        <ScrollReveal className="order-1 lg:order-2">
          <SectionTitle
            align="left"
            eyebrow="Fee Management"
            eyebrowClassName="text-info"
            title="Seamless online"
            highlight="fee collection"
            description="Accept payments via UPI, cards, and net banking. Automated reminders, real-time collection stats, and beautiful revenue analytics."
          />
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}
