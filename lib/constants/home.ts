import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bell,
  BookOpen,
  Bot,
  Bus,
  Calendar,
  ClipboardList,
  Cloud,
  CreditCard,
  Globe,
  GraduationCap,
  Headphones,
  Home,
  Library,
  Lock,
  MessageCircle,
  MessageSquare,
  QrCode,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import type { FeatureGradient } from "@/components/common/feature-card";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: FeatureGradient;
}

export const FEATURES: FeatureItem[] = [
  { icon: QrCode, title: "Smart Attendance", description: "Face Recognition & QR scanning", gradient: "feature-emerald" },
  { icon: CreditCard, title: "Online Fee Payments", description: "UPI, cards & net banking", gradient: "feature-blue" },
  { icon: Bot, title: "AI Report Card Generator", description: "Automated grade reports", gradient: "feature-purple" },
  { icon: BookOpen, title: "AI Homework Assistant", description: "Smart assignment help", gradient: "feature-cyan" },
  { icon: TrendingUp, title: "Performance Analytics", description: "Deep student insights", gradient: "feature-orange" },
  { icon: Bus, title: "Bus GPS Tracking", description: "Real-time route monitoring", gradient: "feature-red" },
  { icon: MessageSquare, title: "Parent Portal", description: "Seamless communication", gradient: "feature-pink" },
  { icon: ClipboardList, title: "Homework & Assignments", description: "Digital submission tracking", gradient: "feature-indigo" },
  { icon: Calendar, title: "Timetable Automation", description: "AI-powered scheduling", gradient: "feature-teal" },
  { icon: Library, title: "Library Management", description: "Catalog & issue tracking", gradient: "feature-amber" },
  { icon: Home, title: "Hostel Management", description: "Room & mess management", gradient: "feature-sky" },
  { icon: Wallet, title: "Staff Payroll", description: "Automated salary processing", gradient: "feature-lime" },
  { icon: Users, title: "Admission Management", description: "End-to-end enrollment", gradient: "feature-fuchsia" },
  { icon: Award, title: "Digital Certificates", description: "Instant credential issuance", gradient: "feature-violet" },
  { icon: Bell, title: "Smart Notifications", description: "Multi-channel alerts", gradient: "feature-rose" },
];

export interface AIFeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const AI_FEATURES: AIFeatureItem[] = [
  { icon: Users, title: "AI Attendance Prediction", description: "Predict absenteeism patterns before they happen" },
  { icon: Target, title: "AI Risk Detection", description: "Identify struggling students early with smart alerts" },
  { icon: MessageCircle, title: "AI Parent Chatbot", description: "24/7 intelligent parent support assistant" },
  { icon: CreditCard, title: "AI Fee Defaulter Prediction", description: "Forecast payment delays and automate reminders" },
  { icon: GraduationCap, title: "AI Exam Analysis", description: "Deep performance insights from every assessment" },
  { icon: Calendar, title: "AI Timetable Generator", description: "Optimal schedules generated in seconds" },
  { icon: TrendingUp, title: "AI Performance Insights", description: "Personalized learning path recommendations" },
  { icon: Sparkles, title: "AI Learning Recommendations", description: "Tailored content for every student" },
  { icon: Bot, title: "AI Admin Assistant", description: "Automate reports, emails, and daily tasks" },
];

export const STATISTICS = [
  { value: 500, suffix: "+", label: "Schools" },
  { value: 250, suffix: "K+", label: "Students" },
  { value: 20, suffix: "K+", label: "Teachers" },
  { value: 10, suffix: "M+", label: "Attendance Records" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
] as const;

export const TESTIMONIALS = [
  { name: "Dr. Sunita Verma", role: "Principal, Delhi Public School", avatar: "SV", rating: 5, text: "MySchoolOps transformed how we manage our 2,000+ students. The AI attendance predictions alone saved us countless hours." },
  { name: "Rajesh Patel", role: "Administrator, Green Valley Academy", avatar: "RP", rating: 5, text: "Fee collection went from 60% to 95% within two months. Parents love the mobile app and online payment options." },
  { name: "Meera Krishnan", role: "Parent, St. Mary's Convent", avatar: "MK", rating: 5, text: "I can track my daughter's bus in real-time and get instant notifications. It's given me complete peace of mind." },
  { name: "Arjun Singh", role: "Teacher, Modern Public School", avatar: "AS", rating: 5, text: "The AI homework assistant and automated report cards have cut my admin work by 70%. I can focus on teaching again." },
  { name: "Priya Desai", role: "Director, Sunrise International", avatar: "PD", rating: 5, text: "We evaluated 5 platforms before choosing MySchoolOps. The analytics and AI features are unmatched in the market." },
] as const;

export const HERO_FLOATING_CARDS = [
  { icon: Users, label: "Student Attendance", value: "94.2%", gradient: "feature-emerald", delay: 0 },
  { icon: CreditCard, label: "Fee Collection", value: "₹12.4L", gradient: "feature-blue", delay: 0.5 },
  { icon: Bus, label: "Bus Live Tracking", value: "3 Active", gradient: "feature-orange", delay: 1 },
  { icon: Bot, label: "AI Assistant", value: "Online", gradient: "feature-purple", delay: 1.5 },
  { icon: Bell, label: "Notifications", value: "12 New", gradient: "feature-pink", delay: 2 },
  { icon: TrendingUp, label: "Exam Results", value: "Published", gradient: "feature-cyan", delay: 2.5 },
] as const;

export const WHY_CHOOSE_US: { icon: LucideIcon; title: string; description: string; gradient: FeatureGradient }[] = [
  { icon: Bot, title: "AI Automation", description: "Intelligent workflows that save hours of manual work every day.", gradient: "feature-indigo" },
  { icon: Cloud, title: "Cloud Based", description: "Access from anywhere. No servers to maintain, always up to date.", gradient: "feature-blue" },
  { icon: Lock, title: "Secure", description: "Bank-grade encryption, role-based access, and GDPR compliance.", gradient: "feature-emerald" },
  { icon: Zap, title: "Fast", description: "Lightning-fast performance with 99.9% uptime guarantee.", gradient: "feature-orange" },
  { icon: Smartphone, title: "Mobile Friendly", description: "Native apps for iOS and Android with offline support.", gradient: "feature-pink" },
  { icon: Sparkles, title: "Easy to Use", description: "Intuitive interface that requires zero training to get started.", gradient: "feature-violet" },
  { icon: Headphones, title: "24×7 Support", description: "Dedicated support team available round the clock.", gradient: "feature-sky" },
  { icon: Globe, title: "Multi-language", description: "Support for 12+ Indian languages and regional customization.", gradient: "feature-lime" },
];
