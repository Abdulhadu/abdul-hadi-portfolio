"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Download } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#070A12]/90 backdrop-blur-xl border-b border-[#1E293B] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#8B5CF6] flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[#F1F5F9]">Abdul<span className="text-[#60A5FA]">Hadi</span></span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === link.href.slice(1)
                  ? "text-[#60A5FA] bg-[#60A5FA]/10"
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="/documents/abdul-hadi-cv.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] text-white text-sm font-semibold hover:shadow-[0_0_30px_rgba(96,165,250,0.35)] transition-all duration-300"
          >
            <Download className="w-4 h-4" /> Resume
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D1220]/95 backdrop-blur-xl border-b border-[#1E293B]"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/documents/abdul-hadi-cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] text-white font-semibold mt-2"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
