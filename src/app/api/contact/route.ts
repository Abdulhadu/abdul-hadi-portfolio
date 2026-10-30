import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(5000),
  honeypot: z.string().max(0).optional(),
});

// In-memory rate limiter
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateMap.get(ip);
  if (!record || now > record.reset) {
    rateMap.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) return true;
  record.count++;
  return false;
}

function generateTicketId(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AH-${year}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: "Too many requests. Please wait 15 minutes." }, { status: 429 });
    }

    const body = await req.json();
    if (body.honeypot) {
      return NextResponse.json({ success: true, ticketId: "", message: "Message received." });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid input.", errors: parsed.error.errors }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;
    const ticketId = generateTicketId();

    // Supabase insert
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey && !supabaseKey.startsWith("REPLACE")) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("contact_inquiries").insert({
        ticket_id: ticketId, name, email, subject, message, ip_address: ip, status: "new",
      });
    }

    // Resend email
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.startsWith("REPLACE")) {
      const resend = new Resend(resendKey);
      await Promise.allSettled([
        resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "hadi27767@gmail.com",
          subject: `[${ticketId}] ${subject}`,
          html: `<h2>New Contact Inquiry</h2><p><b>Ticket:</b> ${ticketId}</p><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b></p><p>${message.replace(/\n/g, "<br>")}</p>`,
        }),
        resend.emails.send({
          from: "Abdul Hadi <onboarding@resend.dev>",
          to: email,
          subject: `Got your message! [${ticketId}]`,
          html: `<h2>Thanks for reaching out, ${name}!</h2><p>I've received your message and will get back to you within 24 hours.</p><p><b>Your ticket ID:</b> ${ticketId}</p><br><p>— Abdul Hadi</p>`,
        }),
      ]);
    }

    return NextResponse.json({ success: true, ticketId, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
