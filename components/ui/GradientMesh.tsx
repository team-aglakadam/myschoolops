"use client";

import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[120px] animate-blob"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[100px] animate-blob"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-1/4 left-1/3 h-[450px] w-[450px] rounded-full bg-purple-500/15 blur-[110px] animate-blob"
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
