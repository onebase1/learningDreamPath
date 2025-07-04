import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      qualification,
      specialization,
      yearsExperience,
      teachingExperience,
      // ... other fields
    } = body

    // Send notification to admin
    await resend.emails.send({
      from: 'no-reply@dreampathlearning.com',
      to: 'support@dreampathlearning.com',
      subject: `New Tutor Application: ${firstName} ${lastName}`,
      html: `
        <h2>New Tutor Application</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h3>Professional Background</h3>
        <p><strong>Qualification:</strong> ${qualification}</p>
        <p><strong>Specialization:</strong> ${specialization}</p>
        <p><strong>Years of Experience:</strong> ${yearsExperience}</p>

        <h3>Teaching Experience</h3>
        <p>${teachingExperience}</p>

        <h3>Technical Setup</h3>
        <p><strong>Has Webcam:</strong> ${body.hasWebcam ? 'Yes' : 'No'}</p>
        <p><strong>Has Headset:</strong> ${body.hasHeadset ? 'Yes' : 'No'}</p>
      `
    })

    // Send confirmation to applicant
    await resend.emails.send({
      from: 'no-reply@dreampathlearning.com',
      to: email,
      subject: 'Your Tutor Application - DreamPath Learning',
      html: `
        <h2>Thank you for your application</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your application to join DreamPath Learning as a tutor. Our team will review your application and get back to you within 5 business days.</p>
        <p>If you have any questions in the meantime, please don't hesitate to contact us at support@dreampathlearning.com.</p>
        <br>
        <p>Best regards,</p>
        <p>The DreamPath Learning Team</p>
      `
    })

    return NextResponse.json({
      message: 'Application submitted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
} 