import { Resend } from "resend";

import DefaultEmail from "@/components/emails/default-email-template";
import { env } from "@/env/server";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  heading,
  text,
}: {
  to: string;
  subject: string;
  heading: string;
  text: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      react: DefaultEmail({ heading, text }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
