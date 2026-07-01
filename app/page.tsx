import dynamic from "next/dynamic";
import { Navbar } from "@/components/home/navbar";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { PageContainer } from "@/components/layout";

const LiveDashboard = dynamic(() => import("@/components/home/live-dashboard").then((m) => m.LiveDashboard));
const AISection = dynamic(() => import("@/components/home/ai-section").then((m) => m.AISection));
const BusTracking = dynamic(() => import("@/components/home/bus-tracking").then((m) => m.BusTracking));
const AttendancePreview = dynamic(() => import("@/components/home/attendance-preview").then((m) => m.AttendancePreview));
const FeesPreview = dynamic(() => import("@/components/home/fees-preview").then((m) => m.FeesPreview));
const Analytics = dynamic(() => import("@/components/home/analytics").then((m) => m.Analytics));
const MobileShowcase = dynamic(() => import("@/components/home/mobile-showcase").then((m) => m.MobileShowcase));
const Testimonials = dynamic(() => import("@/components/home/testimonials").then((m) => m.Testimonials));
const Statistics = dynamic(() => import("@/components/home/statistics").then((m) => m.Statistics));
const WhyChooseUs = dynamic(() => import("@/components/home/why-choose-us").then((m) => m.WhyChooseUs));
const CTA = dynamic(() => import("@/components/home/cta").then((m) => m.CTA));
const Footer = dynamic(() => import("@/components/home/footer").then((m) => m.Footer));

export default function Home() {
  return (
    <PageContainer>
      <Navbar />
      <Hero />
      <LiveDashboard />
      <Features />
      <AISection />
      <BusTracking />
      <AttendancePreview />
      <FeesPreview />
      <Analytics />
      <MobileShowcase />
      <Testimonials />
      <Statistics />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </PageContainer>
  );
}
