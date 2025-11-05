// lib/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

interface EmailResult {
  success: boolean;
  error?: any;
  data?: any;
}

export async function sendVerificationCode(email: string, code: string): Promise<EmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Verify Your Email</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin: 20px 0; letter-spacing: 8px;">
            ${code}
          </div>
          <p>Enter this code on the verification page to complete your registration.</p>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in 10 minutes.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}