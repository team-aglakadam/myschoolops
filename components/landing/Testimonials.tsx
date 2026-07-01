"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    name: "Dr. Sunita Verma",
    role: "Principal, Delhi Public School",
    avatar: "SV",
    rating: 5,
    text: "MySchoolOps transformed how we manage our 2,000+ students. The AI attendance predictions alone saved us countless hours.",
  },
  {
    name: "Rajesh Patel",
    role: "Administrator, Green Valley Academy",
    avatar: "RP",
    rating: 5,
    text: "Fee collection went from 60% to 95% within two months. Parents love the mobile app and online payment options.",
  },
  {
    name: "Meera Krishnan",
    role: "Parent, St. Mary's Convent",
    avatar: "MK",
    rating: 5,
    text: "I can track my daughter's bus in real-time and get instant notifications. It's given me complete peace of mind.",
  },
  {
    name: "Arjun Singh",
    role: "Teacher, Modern Public School",
    avatar: "AS",
    rating: 5,
    text: "The AI homework assistant and automated report cards have cut my admin work by 70%. I can focus on teaching again.",
  },
  {
    name: "Priya Desai",
    role: "Director, Sunrise International",
    avatar: "PD",
    rating: 5,
    text: "We evaluated 5 platforms before choosing MySchoolOps. The analytics and AI features are unmatched in the market.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="glass w-[340px] shrink-0 rounded-[20px] p-6 shadow-[var(--shadow-soft)]">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mb-6 text-sm leading-relaxed text-muted">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 text-xs font-medium text-white">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-500">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by schools across India
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 px-6"
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
