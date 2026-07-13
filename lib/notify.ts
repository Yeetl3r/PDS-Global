import { config } from "@/lib/config";

/**
 * Pluggable notification fan-out. Providers are enabled purely by env:
 *
 *  - RESEND_API_KEY                    → email via Resend HTTP API
 *  - SMTP_HOST/SMTP_PORT/SMTP_USER/…   → email via Nodemailer SMTP
 *  - NOTIFY_WEBHOOK_URL                → generic JSON POST (WhatsApp/Telegram
 *                                        bridge, Slack, Zapier — anything)
 *
 * notify() NEVER throws: a lead must reach its success screen even if every
 * provider is down. Failures are logged (without PII) for later triage.
 */

export interface Notification {
  subject: string;
  /** Plain-text body. May contain PII — goes to providers, never to logs. */
  text: string;
  /** Optional short, PII-free summary for webhook pings. */
  summary?: string;
  /** PII-free reference for logging. */
  refCode: string;
}

type Provider = (n: Notification) => Promise<void>;

function emailRecipient(): string {
  return process.env.NOTIFY_EMAIL_TO ?? config.email;
}

const resendProvider: Provider = async (n) => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_EMAIL_FROM ?? "PDS Global <leads@pdsglobal.in>",
      to: [emailRecipient()],
      subject: n.subject,
      text: n.text,
    }),
  });
  if (!res.ok) {
    throw new Error(`resend responded ${res.status}`);
  }
};

const smtpProvider: Provider = async (n) => {
  const host = process.env.SMTP_HOST;
  if (!host) return;
  // Dynamic import keeps nodemailer out of the edge/client bundles.
  const nodemailer = (await import("nodemailer")).default;
  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  await transport.sendMail({
    from: process.env.NOTIFY_EMAIL_FROM ?? process.env.SMTP_USER,
    to: emailRecipient(),
    subject: n.subject,
    text: n.text,
  });
};

const webhookProvider: Provider = async (n) => {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refCode: n.refCode,
      subject: n.subject,
      summary: n.summary ?? n.subject,
      text: n.text,
    }),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
};

const providers: [string, Provider][] = [
  ["resend", resendProvider],
  ["smtp", smtpProvider],
  ["webhook", webhookProvider],
];

/**
 * Fan a notification out to every configured provider. Resolves once all
 * providers settle; individual failures are logged (ref code only, no PII)
 * and swallowed.
 */
export async function notify(n: Notification): Promise<void> {
  await Promise.allSettled(
    providers.map(async ([name, run]) => {
      try {
        await run(n);
      } catch (err) {
        console.error(
          `[notify] provider "${name}" failed for ${n.refCode}:`,
          err instanceof Error ? err.message : err,
        );
      }
    }),
  );
}
