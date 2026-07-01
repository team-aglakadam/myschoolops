import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LiveDashboard } from "@/components/landing/LiveDashboard";
import { Features } from "@/components/landing/Features";
import { AISection } from "@/components/landing/AISection";
import { BusTracking } from "@/components/landing/BusTracking";
import { AttendanceSection } from "@/components/landing/AttendanceSection";
import { FeeManagement } from "@/components/landing/FeeManagement";
import { StudentAnalytics } from "@/components/landing/StudentAnalytics";
import { MobileShowcase } from "@/components/landing/MobileShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { Statistics } from "@/components/landing/Statistics";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <LiveDashboard />
      <Features />
      <AISection />
      <BusTracking />
      <AttendanceSection />
      <FeeManagement />
      <StudentAnalytics />
      <MobileShowcase />
      <Testimonials />
      <Statistics />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </main>
  );
}
