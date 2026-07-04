"use client";

import { motion } from "motion/react";

const orbs = [
  {
    size: 420,
    top: "-10%",
    left: "-5%",
    color: "#4f46e5",
    delay: 0,
  },
  {
    size: 320,
    top: "55%",
    left: "70%",
    color: "#06b6d4",
    delay: 1,
  },
  {
    size: 260,
    top: "20%",
    left: "75%",
    color: "#8b5cf6",
    delay: 2,
  },
];

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -35, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            borderRadius: "9999px",
            background: orb.color,
            opacity: 0.16,
            filter: "blur(120px)",
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,8,22,0.2), rgba(5,8,22,0.95))",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.18,
        }}
      />
    </div>
  );
}