"use server";
import { Resend } from "resend";

import DefaultEmail from "@/components/emails/default-email-template";
import { env } from "@/env/server";
import { User } from "better-auth";
import { getTranslations } from "next-intl/server";

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

export async function sendResetPasswordEmail({
  user,
  url,
}: {
  user: User;
  url: string;
}) {
  const t = await getTranslations("sendEmail");

  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: user.email.toLowerCase().trim(),
      subject: t("resetPassword.subject"),
      react: DefaultEmail({
        heading: t("resetPassword.heading"),
        text: t("resetPassword.text", { url: url }),
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function sendVerificationEmail({
  user,
  token,
}: {
  user: User;
  token: string;
}) {
  const t = await getTranslations("sendEmail");
  const verificationUrl = `${env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${env.EMAIL_VERIFICATION_CALLBACK_URL}`;

  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: user.email.toLowerCase().trim(),
      subject: t("verifyEmail.subject"),
      react: DefaultEmail({
        heading: t("verifyEmail.heading"),
        text: t("verifyEmail.text", { url: verificationUrl }),
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
