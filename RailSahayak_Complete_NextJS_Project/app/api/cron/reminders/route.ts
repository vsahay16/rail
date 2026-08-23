import { createDecipheriv, createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type Reminder = { id: string; email: string; pnr_ciphertext: string; pnr_iv: string; last_status_fingerprint: string | null };

function decryptPnr(row: Reminder, key: Buffer) {
  const packed = Buffer.from(row.pnr_ciphertext, "base64");
  const ciphertext = packed.subarray(0, -16); const tag = packed.subarray(-16);
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(row.pnr_iv, "base64")); decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET; const supplied = request.headers.get("authorization");
  if (!cronSecret || supplied !== `Bearer ${cronSecret}`) return NextResponse.json({ success: false }, { status: 401 });
  const url = process.env.SUPABASE_URL; const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; const railKey = process.env.RAILRADAR_API_KEY; const encryption = process.env.REMINDER_ENCRYPTION_KEY;
  if (!url || !serviceKey || !railKey || !encryption) return NextResponse.json({ success: false, code: "REMINDER_WORKER_NOT_CONFIGURED" }, { status: 503 });
  const key = Buffer.from(encryption, "base64"); if (key.length !== 32) return NextResponse.json({ success: false, code: "INVALID_ENCRYPTION_KEY" }, { status: 503 });
  const now = new Date().toISOString(); const headers = { apikey: serviceKey, authorization: `Bearer ${serviceKey}`, "content-type": "application/json" };
  const dueResponse = await fetch(`${url}/rest/v1/rail_reminders?select=id,email,pnr_ciphertext,pnr_iv,last_status_fingerprint&status=eq.active&next_check_at=lte.${encodeURIComponent(now)}&expires_at=gt.${encodeURIComponent(now)}&limit=25`, { headers, cache: "no-store" });
  if (!dueResponse.ok) return NextResponse.json({ success: false, code: "REMINDER_QUERY_FAILED" }, { status: 502 });
  const rows = await dueResponse.json() as Reminder[]; let checked = 0; let notified = 0; let failed = 0;
  for (const row of rows) {
    try {
      const pnr = decryptPnr(row, key); if (!/^\d{10}$/.test(pnr)) throw new Error("Invalid encrypted record");
      const response = await fetch(`${process.env.RAILRADAR_API_BASE_URL ?? "https://api.railradar.in/v1"}/pnr/${pnr}`, { headers: { authorization: `Bearer ${railKey}`, accept: "application/json" }, cache: "no-store" });
      if (!response.ok) throw new Error("Provider unavailable");
      const payload = await response.json(); const fingerprint = createHash("sha256").update(JSON.stringify(payload)).digest("hex"); const changed = Boolean(row.last_status_fingerprint && row.last_status_fingerprint !== fingerprint);
      if (changed && process.env.RESEND_API_KEY && process.env.REMINDER_FROM_EMAIL) {
        const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.irctc.co.in/";
        const emailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ from: process.env.REMINDER_FROM_EMAIL, to: [row.email], subject: "Your railway PNR status changed", html: `<p>The status of the PNR you asked RailSahayak to monitor has changed.</p><p><a href="${site.replace(/\/$/, "")}/pnr-status">Check the latest status</a> and verify final travel authority through an official railway service.</p><p>For privacy, this email does not include your PNR.</p>` }) });
        if (emailResponse.ok) notified += 1;
      }
      await fetch(`${url}/rest/v1/rail_reminders?id=eq.${row.id}`, { method: "PATCH", headers, body: JSON.stringify({ last_checked_at: now, last_status_fingerprint: fingerprint, next_check_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() }), cache: "no-store" }); checked += 1;
    } catch { failed += 1; }
  }
  return NextResponse.json({ success: true, checked, notified, failed });
}
