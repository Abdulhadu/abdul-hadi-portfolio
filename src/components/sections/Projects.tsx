"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, TrendingUp, Lightbulb, Target } from "lucide-react";
import { projects } from "@/lib/data";

const categories = ["All", "E-Commerce", "AI SaaS", "SaaS Platform"];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="py-24 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <span className="text-[#60A5FA] text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#F1F5F9]">Projects That Ship</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] mx-auto rounded-full" />
          <p className="mt-4 text-[#94A3B8] max-w-xl mx-auto">Real products, real users, real impact. Every project below is live or was deployed for a paying client.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                  : "bg-[#111827] border border-[#1E293B] text-[#94A3B8] hover:border-[#60A5FA]/30 hover:text-[#F1F5F9]"
              }`}>
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div key={project.title}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col rounded-2xl bg-[#111827] border border-[#1E293B] hover:border-[#60A5FA]/30 transition-all duration-300 hover:shadow-[0_4px_40px_rgba(96,165,250,0.1)] overflow-hidden">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[#60A5FA] text-xs font-semibold uppercase tracking-wide">{project.category}</span>
                      <h3 className="text-[#F1F5F9] font-bold text-xl mt-1 group-hover:text-[#60A5FA] transition-colors">{project.title}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg text-[#64748B] hover:text-[#F1F5F9] hover:bg-white/5 transition-all">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg text-[#64748B] hover:text-[#60A5FA] hover:bg-[#60A5FA]/5 transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Problem / Solution / Impact */}
                <div className="px-6 py-4 border-t border-[#1E293B] space-y-3 flex-1">
                  {project.problem && (
                    <div className="flex gap-2.5">
                      <Target className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                      <p className="text-[#94A3B8] text-xs leading-relaxed"><span className="text-[#EF4444] font-semibold">Problem: </span>{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="flex gap-2.5">
                      <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                      <p className="text-[#94A3B8] text-xs leading-relaxed"><span className="text-[#F59E0B] font-semibold">Solution: </span>{project.solution}</p>
                    </div>
                  )}
                  {project.impact && (
                    <div className="flex gap-2.5">
                      <TrendingUp className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                      <p className="text-[#94A3B8] text-xs leading-relaxed"><span className="text-[#22D3EE] font-semibold">Impact: </span>{project.impact}</p>
                    </div>
                  )}
                </div>

                {/* Tech stack */}
                <div className="px-6 py-4 border-t border-[#1E293B]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-[#0D1220] border border-[#1E293B] text-[#64748B] text-xs font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
