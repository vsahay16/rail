import { createCipheriv, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function configuration() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const encryption = process.env.REMINDER_ENCRYPTION_KEY;
  if (!url || !serviceKey || !encryption) return null;
  const key = Buffer.from(encryption, "base64");
  return key.length === 32 ? { url, serviceKey, key } : null;
}

export async function POST(request: NextRequest) {
  const config = configuration();
  if (!config) return NextResponse.json({ success: false, code: "REMINDERS_NOT_CONFIGURED", message: "Secure reminder storage has not been configured yet." }, { status: 503 });

  const body = await request.json().catch(() => null) as { pnr?: unknown; email?: unknown; consent?: unknown } | null;
  const pnr = typeof body?.pnr === "string" ? body.pnr.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^\d{10}$/.test(pnr) || !/^\S+@\S+\.\S+$/.test(email) || body?.consent !== true) {
    return NextResponse.json({ success: false, message: "A valid PNR, email address and explicit consent are required." }, { status: 400 });
  }

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", config.key, iv);
  const ciphertext = Buffer.concat([cipher.update(pnr, "utf8"), cipher.final()]);
  const encryptedPnr = Buffer.concat([ciphertext, cipher.getAuthTag()]).toString("base64");

  const providerResponse = await fetch(`${config.url}/rest/v1/rail_reminders`, {
    method: "POST",
    headers: {
      apikey: config.serviceKey,
      authorization: `Bearer ${config.serviceKey}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      email,
      pnr_ciphertext: encryptedPnr,
      pnr_iv: iv.toString("base64"),
      consented_at: new Date().toISOString(),
      next_check_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    }),
    cache: "no-store",
  });

  if (!providerResponse.ok) return NextResponse.json({ success: false, message: "The reminder could not be saved securely." }, { status: 502 });
  return NextResponse.json({ success: true, message: "Your encrypted PNR monitoring request has been saved." }, { status: 201 });
}
