"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experiences } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-24 bg-[#0D1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-[#60A5FA] text-sm font-semibold tracking-widest uppercase">Experience</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#F1F5F9]">Career Timeline</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#60A5FA]/50 via-[#8B5CF6]/30 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-16 sm:pl-24">
                {/* Dot */}
                <div className="absolute left-0 sm:left-4 top-6 w-8 h-8 rounded-full bg-[#111827] border-2 border-[#60A5FA] flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                  <Briefcase className="w-4 h-4 text-[#60A5FA]" />
                </div>

                <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] hover:border-[#60A5FA]/30 transition-all duration-300 hover:shadow-[0_4px_40px_rgba(96,165,250,0.08)]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-[#F1F5F9] font-bold text-lg">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#60A5FA] font-semibold text-sm">{exp.company}</span>
                        {exp.type && (
                          <span className="px-2 py-0.5 rounded-md bg-[#60A5FA]/10 text-[#60A5FA] text-xs font-medium">{exp.type}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span className="flex items-center gap-1.5 text-[#64748B] text-sm">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1.5 text-[#64748B] text-sm">
                          <MapPin className="w-3.5 h-3.5" /> {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-[#94A3B8] text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] mt-2 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {exp.tech && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1E293B]">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-[#0D1220] border border-[#1E293B] text-[#64748B] text-xs font-mono">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
