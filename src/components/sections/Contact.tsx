"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail, MapPin, Send, CheckCircle, Github, Linkedin, Clock } from "lucide-react";
import { personalInfo } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setTicketId(json.ticketId);
        setSubmitted(true);
        reset();
      } else {
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#0D1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-[#60A5FA] text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#F1F5F9]">Let&apos;s Build Something</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] mx-auto rounded-full" />
          <p className="mt-4 text-[#94A3B8] max-w-xl mx-auto">Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* LEFT sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6">
            {/* Quick contact */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B]">
              <h3 className="text-[#F1F5F9] font-semibold mb-4">Quick Connect</h3>
              <a href={personalInfo.whatsappLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#22D3EE]/5 border border-[#22D3EE]/20 hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/10 transition-all group">
                <MessageCircle className="w-5 h-5 text-[#22D3EE]" />
                <div>
                  <div className="text-[#F1F5F9] text-sm font-medium group-hover:text-[#22D3EE] transition-colors">WhatsApp</div>
                  <div className="text-[#64748B] text-xs">Usually replies in minutes</div>
                </div>
              </a>
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#60A5FA]/5 border border-[#60A5FA]/20 hover:border-[#60A5FA]/40 hover:bg-[#60A5FA]/10 transition-all group mt-3">
                <Mail className="w-5 h-5 text-[#60A5FA]" />
                <div>
                  <div className="text-[#F1F5F9] text-sm font-medium group-hover:text-[#60A5FA] transition-colors">Email</div>
                  <div className="text-[#64748B] text-xs">{personalInfo.email}</div>
                </div>
              </a>
            </div>

            {/* Info cards */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] space-y-4">
              <div className="flex items-center gap-3 text-[#94A3B8] text-sm">
                <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-3 text-[#94A3B8] text-sm">
                <Clock className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                PKT (UTC+5) — Flexible hours
              </div>
              <div className="h-px bg-[#1E293B]" />
              <div className="flex gap-3">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0D1220] border border-[#1E293B] text-[#64748B] hover:text-[#F1F5F9] hover:border-[#60A5FA]/30 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0D1220] border border-[#1E293B] text-[#64748B] hover:text-[#60A5FA] hover:border-[#60A5FA]/30 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#60A5FA]/10 to-[#8B5CF6]/10 border border-[#60A5FA]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span className="text-[#22D3EE] text-sm font-semibold">Available Now</span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Open to full-time remote roles and select freelance projects.</p>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 rounded-2xl bg-[#111827] border border-[#22D3EE]/30 text-center">
                <CheckCircle className="w-16 h-16 text-[#22D3EE] mb-4" />
                <h3 className="text-[#F1F5F9] font-bold text-2xl mb-2">Message Sent!</h3>
                <p className="text-[#94A3B8] mb-4">I&apos;ll get back to you within 24 hours.</p>
                {ticketId && (
                  <div className="px-4 py-2 rounded-lg bg-[#0D1220] border border-[#1E293B] text-[#60A5FA] font-mono text-sm">
                    Ticket: {ticketId}
                  </div>
                )}
                <button onClick={() => { setSubmitted(false); setTicketId(""); }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] text-sm hover:bg-[#60A5FA]/20 transition-all">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-2xl bg-[#111827] border border-[#1E293B] space-y-5">
                {/* Honeypot */}
                <input {...register("honeypot")} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#94A3B8] text-sm font-medium mb-2">Name *</label>
                    <input {...register("name")} placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1220] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:border-[#60A5FA]/50 focus:ring-1 focus:ring-[#60A5FA]/20 outline-none transition-all text-sm" />
                    {errors.name && <p className="text-[#EF4444] text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] text-sm font-medium mb-2">Email *</label>
                    <input {...register("email")} type="email" placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1220] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:border-[#60A5FA]/50 focus:ring-1 focus:ring-[#60A5FA]/20 outline-none transition-all text-sm" />
                    {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[#94A3B8] text-sm font-medium mb-2">Subject *</label>
                  <input {...register("subject")} placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-[#0D1220] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:border-[#60A5FA]/50 focus:ring-1 focus:ring-[#60A5FA]/20 outline-none transition-all text-sm" />
                  {errors.subject && <p className="text-[#EF4444] text-xs mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-[#94A3B8] text-sm font-medium mb-2">Message *</label>
                  <textarea {...register("message")} rows={6} placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0D1220] border border-[#1E293B] text-[#F1F5F9] placeholder-[#475569] focus:border-[#60A5FA]/50 focus:ring-1 focus:ring-[#60A5FA]/20 outline-none transition-all text-sm resize-none" />
                  {errors.message && <p className="text-[#EF4444] text-xs mt-1">{errors.message.message}</p>}
                </div>
                {error && <p className="text-[#EF4444] text-sm">{error}</p>}
                <button type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] text-white font-semibold hover:shadow-[0_0_30px_rgba(96,165,250,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
