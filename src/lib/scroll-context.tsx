"use client";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

export type Section = "hero" | "about" | "skills" | "experience" | "projects" | "contact";

interface ScrollContextType {
  scrollY: number;
  scrollProgress: number; // 0-1 full page
  activeSection: Section;
  sectionProgress: number; // 0-1 within current section
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0, scrollProgress: 0, activeSection: "hero", sectionProgress: 0,
});

const SECTIONS: Section[] = ["hero", "about", "skills", "experience", "projects", "contact"];

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollContextType>({
    scrollY: 0, scrollProgress: 0, activeSection: "hero", sectionProgress: 0,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docH > 0 ? scrollY / docH : 0;

      let activeSection: Section = "hero";
      let sectionProgress = 0;

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - 120;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          activeSection = id;
          sectionProgress = Math.max(0, Math.min(1, (scrollY - top) / el.offsetHeight));
          break;
        }
        if (scrollY >= bottom) activeSection = id;
      }

      setState({ scrollY, scrollProgress, activeSection, sectionProgress });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>;
}

export const useScroll = () => useContext(ScrollContext);
