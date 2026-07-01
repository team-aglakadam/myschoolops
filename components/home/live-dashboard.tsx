"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { LiveDashboardWidget } from "@/components/widgets/live-dashboard-widget";
import { SectionContainer } from "@/components/layout";

const NOTIFICATIONS = [
  "Parent message: Pickup delayed by 10 min",
  "Fee payment received — ₹25,000",
  "AI: 2 students at risk in Mathematics",
  "Bus Route 7 arriving in 5 minutes",
];

export function LiveDashboard() {
  const [attendance, setAttendance] = useState(1247);
  const [revenue, setRevenue] = useState(68);
  const [notifIndex, setNotifIndex] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setAttendance((p) => p + 1), 3000);
    const t2 = setInterval(() => setRevenue((p) => (p < 92 ? p + 1 : p)), 4000);
    const t3 = setInterval(() => setNotifIndex((p) => (p + 1) % NOTIFICATIONS.length), 3500);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  return (
    <SectionContainer>
      <ScrollReveal className="mb-16">
        <SectionTitle
          eyebrow="Live Dashboard"
          title="Real-time insights at your fingertips"
          description="Watch your school operations come alive with live data, AI alerts, and instant notifications."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <LiveDashboardWidget
          attendance={attendance}
          revenue={revenue}
          notifIndex={notifIndex}
          notifications={NOTIFICATIONS}
        />
      </ScrollReveal>
    </SectionContainer>
  );
}
