"use client";
import { motion } from "framer-motion";
import { Code2, ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070A12] border-t border-[#1E293B] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#8B5CF6] flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[#94A3B8] text-sm">
              Built with <Heart className="inline w-3.5 h-3.5 text-[#EF4444] mx-0.5" /> by <span className="text-[#60A5FA] font-semibold">Abdul Hadi</span>
            </span>
          </div>
          <span className="text-[#64748B] text-sm">© {new Date().getFullYear()} All rights reserved.</span>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2.5 rounded-xl bg-[#111827] border border-[#1E293B] text-[#64748B] hover:text-[#60A5FA] hover:border-[#60A5FA]/30 transition-all">
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
