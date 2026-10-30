"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, Globe, Rocket } from "lucide-react";
import { personalInfo } from "@/lib/data";

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Writing maintainable, scalable architecture that teams can grow with.", color: "#60A5FA" },
  { icon: Cpu, title: "Backend First", desc: "Deep expertise in Django, Flask, APIs, and production-grade server systems.", color: "#8B5CF6" },
  { icon: Globe, title: "Global Reach", desc: "Delivered projects for clients in 6+ countries across diverse industries.", color: "#22D3EE" },
  { icon: Rocket, title: "AI Integration", desc: "Building LLM-powered platforms, RAG pipelines, and intelligent automation.", color: "#60A5FA" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-[#0D1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-[#60A5FA] text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#F1F5F9]">The Engineer Behind the Code</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6">
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              I&apos;m <span className="text-[#F1F5F9] font-semibold">{personalInfo.name}</span>, a Full Stack Python Engineer with 5+ years building production systems that scale. From e-commerce platforms serving thousands of users to AI-powered SaaS tools, I deliver backend systems that are fast, reliable, and maintainable.
            </p>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              My work spans <span className="text-[#60A5FA]">Python (Django, Flask)</span>, <span className="text-[#8B5CF6]">React / Next.js</span>, and <span className="text-[#22D3EE]">AI integration</span> — combining deep backend expertise with modern frontend to build complete products that solve real business problems.
            </p>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Currently at <span className="text-[#F1F5F9] font-semibold">ZenCloud</span> and open to high-impact remote roles where I can own architecture, lead technical decisions, and ship products users love.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] text-sm font-medium hover:bg-[#60A5FA]/20 transition-all">
                {personalInfo.email}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111827] border border-[#1E293B] text-[#94A3B8] text-sm font-medium hover:border-[#60A5FA]/30 transition-all">
                GitHub Profile →
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div key={h.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] hover:border-[#60A5FA]/30 group transition-all duration-300 hover:shadow-[0_4px_40px_rgba(96,165,250,0.08)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: h.color + "1A" }}>
                  <h.icon className="w-5 h-5" style={{ color: h.color }} />
                </div>
                <h3 className="text-[#F1F5F9] font-semibold mb-2">{h.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
