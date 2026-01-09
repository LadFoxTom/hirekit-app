import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';

// Test endpoint to verify email configuration
// Only use this for debugging - remove in production or protect with admin auth
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Log environment variables (without exposing API key)
    console.log('Email Configuration Check (Resend):', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      hasFrom: !!process.env.EMAIL_FROM,
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    });

    // Generate a test token
    const testToken = 'test-token-' + Date.now();

    // Try to send email
    const emailSent = await sendPasswordResetEmail(email, testToken);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully. Check your inbox and spam folder.',
        config: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email. Check server logs for details.',
        config: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          hasFrom: !!process.env.EMAIL_FROM,
        },
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
