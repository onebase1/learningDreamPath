import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params
    
    // Validate document type
    if (!['privacy', 'terms', 'guidelines'].includes(type)) {
      return new NextResponse('Invalid document type', { status: 400 })
    }

    // Get file from S3
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `legal/${type}.pdf`,
    })

    const response = await s3Client.send(command)
    const stream = response.Body as any

    // Set appropriate headers
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set(
      'Content-Disposition',
      `attachment; filename="dreampath-${type}.pdf"`
    )

    return new NextResponse(stream, { headers })
  } catch (error) {
    console.error('Error downloading PDF:', error)
    return new NextResponse('Error downloading PDF', { status: 500 })
  }
}