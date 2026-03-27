import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Salam Society Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO || "SalamSocietyCanada@gmail.com",
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `New message from ${name.trim()} — Salam Society Website`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px;">
          <h2 style="color: #F47B20;">New Contact Form Submission</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; font-size:13px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <div style="margin-top:16px; padding:16px; background:#f9f9f9; border-radius:8px; font-size:15px; line-height:1.6;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="color:#aaa; font-size:12px; margin-top:16px;">Sent from salamsociety.ca contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
