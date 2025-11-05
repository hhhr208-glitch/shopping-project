// app/api/auth/send-code/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log('🎯 Send code API called');
  
  try {
    const { email } = await request.json();
    console.log('📧 Received email:', email);

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log('🔐 Generated code:', code);

    // Store in database
    await prisma.verificationToken.upsert({
      where: { 
        identifier_token: {
          identifier: email,
          token: code
        }
      },
      update: { 
        token: code,
        expires,
      },
      create: {
        identifier: email,
        token: code,
        expires,
      }
    });

    // Send email via Resend
    console.log('📤 Attempting to send email...');
    
    // Check if Resend API key exists
    if (!process.env.RESEND_API_KEY) {
      console.log('❌ NO RESEND API KEY - using test mode');
      return NextResponse.json({ 
        success: true, 
        message: `TEST MODE: Use code ${code}` 
      });
    }

    // Import and send email
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #dc2626;">Verify Your Email</h2>
          <p>Your verification code is:</p>
          <h1 style="font-size: 32px; color: #dc2626; letter-spacing: 10px; margin: 20px 0;">
            ${code}
          </h1>
          <p>Enter this code to complete your registration.</p>
          <p><small>This code expires in 10 minutes.</small></p>
        </div>
      `
    });

    if (error) {
      console.log('❌ Email send failed:', error);
      return NextResponse.json({ 
        success: true, 
        message: `Email failed, use code: ${code}` 
      });
    }

    console.log('✅ Email sent successfully!');
    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent to your email' 
    });

  } catch (error) {
    console.log('❌ Send code error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send code' },
      { status: 500 }
    );
  }
}