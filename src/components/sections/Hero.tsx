"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalInfo, stats } from "@/lib/data";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";

// ── TYPEWRITER ────────────────────────────────────────────────────────────────
const ROLES = [
  "Python Backend Engineer",
  "Full Stack Developer",
  "Django & FastAPI Expert",
  "AI Integration Specialist",
  "React & Next.js Developer",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const full = ROLES[idx];
    if (!deleting && displayed.length < full.length) {
      timerRef.current = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === full.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }
    return () => { if (timerRef.current !== undefined) clearTimeout(timerRef.current); };
  }, [displayed, deleting, idx]);

  return (
    <span className="text-accent-blue font-mono">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ── FLOATING PARTICLE ─────────────────────────────────────────────────────────
function FloatingParticle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-accent-blue/40"
      style={{ left: x, top: y }}
      animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  // Determine which portrait to use (new dark portrait preferred, fallback to profile.jpg)
  const portraitSrc = "/images/abdul-hadi-hero-portrait-dark.jpg";
  const fallbackSrc = "/images/profile.jpg";
  const [imgSrc, setImgSrc] = useState(portraitSrc);

  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    x: `${10 + (i * 6.5) % 80}%`,
    y: `${15 + (i * 7.3) % 70}%`,
  }));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle radial gradient overlay (keeps 3D visible beneath) */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Floating DOM particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
      ))}

      {/* ── GRID ──────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — TEXT */}
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         border border-accent-blue/30 bg-accent-blue/8 text-accent-blue text-xs font-mono"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-bold leading-none tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-text-primary">
                Abdul
              </span>
              <span
                className="block text-5xl sm:text-6xl xl:text-7xl"
                style={{
                  background: "linear-gradient(135deg, #60A5FA 0%, #8B5CF6 50%, #22D3EE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hadi
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              className="text-lg sm:text-xl font-mono h-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typewriter />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-text-muted text-base sm:text-lg leading-relaxed max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
                           bg-accent-blue text-bg-primary hover:bg-accent-blue/90
                           transition-all duration-200 shadow-lg shadow-accent-blue/25"
              >
                <Mail size={16} />
                Hire Me
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
                           border border-border bg-card/60 backdrop-blur-sm text-text-primary
                           hover:border-accent-blue/50 hover:bg-card/80 transition-all duration-200"
              >
                View Projects
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
                           border border-border bg-card/60 backdrop-blur-sm text-text-muted
                           hover:border-accent-violet/50 hover:text-text-primary transition-all duration-200"
              >
                <Download size={16} />
                Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { href: personalInfo.github, icon: Github, label: "GitHub" },
                { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center
                             text-text-muted hover:text-accent-blue hover:border-accent-blue/50
                             transition-all duration-200 bg-card/40 backdrop-blur-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — PORTRAIT */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative flex items-center justify-center">
              {/* Outer glow halo */}
              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
                }} />

              {/* Spinning ring 1 */}
              <motion.div
                className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-accent-blue/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: "22rem", height: "22rem" }}
              >
                <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent-blue/70 -translate-x-1/2" />
                <div className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-accent-violet/60 -translate-x-1/2" />
              </motion.div>

              {/* Spinning ring 2 */}
              <motion.div
                className="absolute rounded-full border border-accent-violet/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                style={{ width: "19rem", height: "19rem" }}
              >
                <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full bg-accent-cyan/70 -translate-y-1/2" />
              </motion.div>

              {/* Spinning ring 3 */}
              <motion.div
                className="absolute rounded-full border border-accent-cyan/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                style={{ width: "16.5rem", height: "16.5rem" }}
              />

              {/* Photo circle */}
              <div
                className="relative z-10 rounded-full overflow-hidden"
                style={{
                  width: "14rem",
                  height: "14rem",
                  boxShadow:
                    "0 0 0 2px rgba(96,165,250,0.5), 0 0 40px rgba(96,165,250,0.2), 0 0 80px rgba(139,92,246,0.15)",
                }}
              >
                <Image
                  src={imgSrc}
                  alt={`${personalInfo.name} — portrait`}
                  fill
                  className="object-cover object-top"
                  sizes="224px"
                  priority
                  onError={() => setImgSrc(fallbackSrc)}
                />
                {/* Subtle dark vignette at bottom to blend with bg */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-primary/60 to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-6 sm:-right-10 px-3 py-1.5 rounded-lg
                           border border-accent-blue/30 bg-card/80 backdrop-blur-sm text-xs font-mono text-accent-blue"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Python Expert
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-6 sm:-left-10 px-3 py-1.5 rounded-lg
                           border border-accent-violet/30 bg-card/80 backdrop-blur-sm text-xs font-mono text-accent-violet"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                Full Stack
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-16 sm:-right-20 px-3 py-1.5 rounded-lg
                           border border-accent-cyan/30 bg-card/80 backdrop-blur-sm text-xs font-mono text-accent-cyan"
                animate={{ y: [0, -4, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                AI / ML
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── STATS ───────────────────────────────────────────────────────── */}
        <motion.div
          className="mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-center
                         hover:border-accent-blue/30 transition-colors duration-200"
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent-blue">{s.value}</div>
              <div className="text-xs sm:text-sm text-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted/50 hover:text-accent-blue transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
