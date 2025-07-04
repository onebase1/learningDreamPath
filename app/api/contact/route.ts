import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Send notification to support team
    await resend.emails.send({
      from: 'no-reply@dreampathlearning.com',
      to: 'support@dreampathlearning.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'no-reply@dreampathlearning.com',
      to: email,
      subject: 'We received your message - DreamPath Learning',
      html: `
        <h2>Thank you for contacting DreamPath Learning</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>For reference, here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p>The DreamPath Learning Team</p>
      `
    })

    return NextResponse.json({
      message: 'Contact form submitted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
} 