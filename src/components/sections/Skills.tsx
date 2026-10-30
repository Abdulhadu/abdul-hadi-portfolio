"use client";
import { useRef } from "react";
import type { ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Monitor, Brain, Database, Cloud, Zap, Wrench, Layers } from "lucide-react";
import { skills } from "@/lib/data";

const iconMap: Record<string, ElementType> = {
  Server, Monitor, Brain, Database, Cloud, Zap, Wrench, Layers,
};

const colors = ["#60A5FA", "#8B5CF6", "#22D3EE", "#60A5FA", "#8B5CF6", "#22D3EE", "#60A5FA", "#8B5CF6"];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-24 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-[#60A5FA] text-sm font-semibold tracking-widest uppercase">Technical Skills</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#F1F5F9]">My Tech Arsenal</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] mx-auto rounded-full" />
          <p className="mt-4 text-[#94A3B8] max-w-xl mx-auto">Production-tested tools and technologies I use to ship fast, reliable, and scalable software.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, i) => {
            const Icon = iconMap[category.icon] || Server;
            const color = colors[i % colors.length];
            return (
              <motion.div key={category.category}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] hover:border-[#60A5FA]/30 group transition-all duration-300 hover:shadow-[0_4px_40px_rgba(96,165,250,0.08)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + "1A" }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <h3 className="text-[#F1F5F9] font-semibold text-sm">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item}
                      className="px-2.5 py-1 rounded-md bg-[#0D1220] border border-[#1E293B] text-[#94A3B8] text-xs font-mono hover:border-[#60A5FA]/30 hover:text-[#60A5FA] transition-all duration-200">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
